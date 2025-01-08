import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import {
  CantoAssetMetadata,
  GalleryDataFilters,
  MetadataAssetSchema,
  UnsupportedCantoScheme,
} from "./schema";
import z from "zod";
import { ForPageInput, WhereInFiltersInput } from "@/gql/graphql";

const whereIn = (filters: GalleryDataFilters): WhereInFiltersInput => {
  const { tag } = filters;
  if (tag.length > 0) {
    return { key: "tag", values: tag };
  }

  return { key: "", values: [""] };
};

const forPage = ({ limit, page }: GalleryDataFilters): ForPageInput => {
  return { items: limit, page };
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
      $scheme: [String]
      $whereIn: WhereInFiltersInput
      $forPage: ForPageInput
    ) {
      galleriesEntries(site: $site, uri: $uri) {
        ... on galleries_gallery_Entry {
          id
          title
          description
          assetAlbum(
            whereNotIn: { key: "scheme", values: $scheme }
            forPage: $forPage
            whereIn: $whereIn
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
            whereNotIn: { key: "scheme", values: $scheme }
            whereIn: $whereIn
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
      scheme: UnsupportedCantoScheme.options,
      whereIn: whereIn(filters),
      forPage: forPage(filters),
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
