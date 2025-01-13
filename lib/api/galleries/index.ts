import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import {
  CantoAssetMetadata,
  GalleryDataFilters,
  MetadataAssetSchema,
  SupportedCantoScheme,
  UnsupportedCantoScheme,
} from "./schema";
import z from "zod";
import {
  ForPageInput,
  WhereContainsInFilterInput,
  WhereInFiltersInput,
  WhereNotInFiltersInput,
} from "@/gql/graphql";

const whereIn = ({ tag = [] }: GalleryDataFilters): WhereInFiltersInput => {
  if (tag.length > 0) {
    return { key: "tag", values: tag };
  }

  return { key: "", values: [""] };
};

const forPage = ({ limit, page }: GalleryDataFilters): ForPageInput => {
  return { items: limit, page };
};

const whereContainsIn = ({
  search,
}: GalleryDataFilters): WhereContainsInFilterInput => {
  if (search) {
    return { keys: ["name", "tag"], value: search };
  }

  return { keys: [""], value: "" };
};

const whereNotIn = ({
  type = [],
}: GalleryDataFilters): WhereNotInFiltersInput => {
  if (type.length > 0) {
    return {
      key: "scheme",
      values: SupportedCantoScheme.options.filter(
        (option) => !type.includes(option)
      ),
    };
  }

  return { key: "scheme", values: UnsupportedCantoScheme.options };
};

export async function getAllGalleries(locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query AllGalleriesQuery($site: [String]) {
      galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });
  const galleries: Array<{ gallery: string }> = [];

  data?.galleriesEntries?.forEach((gallery) => {
    if (gallery && gallery.slug) {
      galleries.push({ gallery: gallery.slug });
    }
  });

  return galleries;
}

interface GalleryMetadata {
  title: string | null;
  description: string | null;
  representativeImage?: CantoAssetMetadata;
}

export async function getGalleryMetadata(
  gallery: string,
  locale: string
): Promise<GalleryMetadata | undefined> {
  const site = getSiteFromLocale(locale);
  const uri = `gallery/${gallery}`;

  const query = graphql(`
    query GalleryMetadataQuery($site: [String], $uri: [String]) {
      galleriesEntries(site: $site, uri: $uri) {
        ... on galleries_gallery_Entry {
          slug
          title
          description
          cantoAssetSingle {
            additional {
              AltTextEN
              AltTextES
              TitleEN
              TitleES
            }
            height
            id
            name
            scheme
            url {
              directUrlOriginal
              directUrlPreview
              directUrlPreviewPlay
            }
            width
          }
          assetAlbum(first: true) {
            additional {
              AltTextEN
              AltTextES
              TitleEN
              TitleES
            }
            height
            id
            name
            scheme
            url {
              directUrlOriginal
              directUrlPreview
              directUrlPreviewPlay
            }
            width
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: {
      site,
      uri,
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0])
    return undefined;

  const {
    galleriesEntries: [galleryMetadata],
  } = data;

  const { title, description, cantoAssetSingle, assetAlbum } = galleryMetadata;

  const sharedProps = {
    title,
    description,
  };

  if (cantoAssetSingle && cantoAssetSingle[0]) {
    const { data: asset } = MetadataAssetSchema.safeParse(cantoAssetSingle[0]);

    if (asset) {
      return { ...sharedProps, representativeImage: asset };
    }
  }

  if (assetAlbum && assetAlbum[0]) {
    const { data: asset } = MetadataAssetSchema.safeParse(assetAlbum[0]);

    if (asset) {
      return { ...sharedProps, representativeImage: asset };
    }
  }

  return sharedProps;
}

export async function getGalleryData(
  gallery: string,
  locale: string,
  filters: GalleryDataFilters
) {
  const site = getSiteFromLocale(locale);
  const query = graphql(`
    query GalleryQuery(
      $site: [String]
      $uri: [String]
      $whereIn: WhereInFiltersInput
      $whereNotIn: WhereNotInFiltersInput
      $whereContainsIn: WhereContainsInFilterInput
      $forPage: ForPageInput
    ) {
      galleriesEntries(site: $site, uri: $uri) {
        ... on galleries_gallery_Entry {
          id
          title
          description
          assetAlbum(
            whereNotIn: $whereNotIn
            forPage: $forPage
            whereIn: $whereIn
            whereContainsIn: $whereContainsIn
          ) {
            additional {
              AltTextEN
              AltTextES
              TitleEN
              TitleES
            }
            height
            id
            name
            scheme
            url {
              directUrlOriginal
              directUrlPreview
              directUrlPreviewPlay
            }
            width
          }
        }
      }
      metaGalleries: galleriesEntries(site: $site, uri: $uri) {
        ... on galleries_gallery_Entry {
          assetAlbum(
            whereNotIn: $whereNotIn
            whereIn: $whereIn
            whereContainsIn: $whereContainsIn
          ) {
            id
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: {
      site,
      uri: `gallery/${gallery}`,
      whereNotIn: whereNotIn(filters),
      whereIn: whereIn(filters),
      forPage: forPage(filters),
      whereContainsIn: whereContainsIn(filters),
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0])
    return undefined;

  const {
    galleriesEntries: [entry],
    metaGalleries,
  } = data;

  const { data: assetAlbum } = z
    .array(MetadataAssetSchema)
    .safeParse(entry.assetAlbum);

  if (!assetAlbum) return undefined;

  const total = metaGalleries ? metaGalleries[0]?.assetAlbum?.length : 0;

  return {
    ...entry,
    assetAlbum,
    total,
  };
}
