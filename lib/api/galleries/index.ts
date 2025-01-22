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
import { fullBaseFields } from "../fragments/shared";

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

export const galleryFragment = `
  fragment galleryFragment on galleries_gallery_Entry {
    ${fullBaseFields}
    description
    cantoAssetSingle {
      metadata: additional {
        AltTextEN
        AltTextES
        TitleEN
        TitleES
      }
      height
      url {
        directUrlOriginal
        directUrlPreview
      }
      width
    }
  }
`;
export async function getMainGallery(locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query MainGalleryQuery($site: [String]) {
      pagesEntries(site: $site, uri: "gallery") {
        ... on pages_galleryLandingPage_Entry {
          __typename
          isVisible
          galleryEntry {
            ... on galleries_gallery_Entry {
              __typename
              slug
            }
          }
          slideshowEntry {
            ... on slideshows_slideshow_Entry {
              id
              uri
              title
              richTextDescription
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });

  if (!data) return;

  const { pagesEntries } = data;

  if (
    !pagesEntries ||
    !pagesEntries[0] ||
    pagesEntries[0].__typename !== "pages_galleryLandingPage_Entry"
  ) {
    return;
  }

  const [{ isVisible, galleryEntry, slideshowEntry }] = pagesEntries;

  if (
    galleryEntry[0]?.__typename !== "galleries_gallery_Entry" ||
    !galleryEntry[0].slug
  ) {
    return;
  }

  return {
    isVisible: !!isVisible,
    gallery: galleryEntry[0].slug,
    slideshows: slideshowEntry,
  };
}

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

export async function isMainGallery(gallery: string, locale: string) {
  return (await getMainGallery(locale))?.gallery === gallery;
}
interface GalleryMetadata {
  title: string | null;
  description: string | null;
  representativeImage?: CantoAssetMetadata;
  isMainGallery: boolean;
}

export async function getGalleryMetadata(
  gallery: string,
  locale: string
): Promise<GalleryMetadata | undefined> {
  const site = getSiteFromLocale(locale);
  const uri = `gallery/collections/${gallery}`;

  const query = graphql(`
    query GalleryMetadataQuery(
      $site: [String]
      $slug: [String]
      $uri: [String]
    ) {
      pagesEntries(site: $site, uri: "gallery") {
        ... on pages_galleryLandingPage_Entry {
          __typename
          galleryEntry(slug: $slug) {
            ... on galleries_gallery_Entry {
              id
            }
          }
        }
      }
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
      slug: gallery,
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0])
    return undefined;

  const {
    pagesEntries,
    galleriesEntries: [galleryMetadata],
  } = data;

  const { title, description, cantoAssetSingle, assetAlbum } = galleryMetadata;

  const sharedProps = {
    title,
    description,
    isMainGallery: (await getMainGallery(locale))?.gallery === gallery,
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
      uri: `gallery/collections/${gallery}`,
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
