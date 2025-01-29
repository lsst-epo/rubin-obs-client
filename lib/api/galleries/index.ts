import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import {
  CantoAssetMetadata,
  GalleryDataFilters,
  MetadataAssetSchema,
  UnsupportedCantoScheme,
  SupportedCantoScheme,
} from "./schema";
import z from "zod";
import {
  ForPageInput,
  InputMaybe,
  SortByDescInput,
  SortByInput,
  WhereContainsInFilterInput,
  WhereInFiltersInput,
  WhereNotInFiltersInput,
} from "@/gql/graphql";

const sortBy = ({ sort }: GalleryDataFilters): InputMaybe<SortByInput> => {
  if (sort === "asc") {
    return { field: "default.DateCreated", flags: null };
  }

  return null;
};
const sortByDesc = ({
  sort,
}: GalleryDataFilters): InputMaybe<SortByDescInput> => {
  if (sort === "desc") {
    return { field: "default.DateCreated", flags: null };
  }

  return null;
};

const whereIn = ({
  tag = [],
}: GalleryDataFilters): Array<WhereInFiltersInput> => {
  const whereIn: Array<WhereInFiltersInput> = [];
  if (tag.length > 0) {
    whereIn.push({ key: "tag", values: tag });
  }

  return whereIn;
};

const forPage = ({ limit, page }: GalleryDataFilters): ForPageInput => {
  return { items: limit, page };
};

const whereContainsIn = ({
  search,
}: GalleryDataFilters): Array<WhereContainsInFilterInput> => {
  const whereContainsIn: Array<WhereContainsInFilterInput> = [];
  if (search) {
    whereContainsIn.push({ keys: ["name", "tag"], value: search });
  }

  return whereContainsIn;
};

const whereNotIn = ({
  type = [],
}: GalleryDataFilters): Array<WhereNotInFiltersInput> => {
  const whereNotIn: Array<WhereNotInFiltersInput> = [];
  const { options: unsupported } = UnsupportedCantoScheme;

  if (type.length > 0) {
    const { options: supported } = SupportedCantoScheme;

    whereNotIn.push({
      key: "scheme",
      values: [
        ...unsupported,
        ...supported.filter((scheme) => !type.includes(scheme)),
      ],
    });
  } else {
    whereNotIn.push({ key: "scheme", values: unsupported });
  }

  return whereNotIn;
};

const imageAsset = z.object({
  altText: z.string().nullable(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

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
              __typename
              id
              uri
              title
              richTextDescription
              images: representativeAssetVariant {
                ... on assetVariants_Asset {
                  __typename
                  altText
                  width
                  height
                  url
                }
              }
            }
          }
        }
      }
      slideshowsMain: pagesEntries(site: $site, slug: "slideshows") {
        ... on pages_pages_Entry {
          __typename
          uri
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });

  if (!data) return;

  const { pagesEntries, slideshowsMain } = data;

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

  const slideshows = slideshowEntry
    .filter(
      (slideshow) =>
        slideshow !== null &&
        slideshow.__typename === "slideshows_slideshow_Entry"
    )
    .map(({ images, ...slideshow }) => {
      const { data: image } = imageAsset.safeParse(images[0]);

      return {
        ...slideshow,
        image,
      };
    });

  const slideshowsUri =
    slideshowsMain && slideshowsMain[0]?.__typename === "pages_pages_Entry"
      ? slideshowsMain[0]?.uri
      : undefined;

  return {
    isVisible: !!isVisible,
    gallery: galleryEntry[0].slug,
    slideshows,
    slideshowsUri: slideshowsUri || undefined,
  };
}

export async function getAllGalleries(locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query AllGalleries($site: [String]) {
      galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          title
          id
          uri
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });

  if (!data || !data.galleriesEntries) return [];

  const { galleriesEntries } = data;

  return galleriesEntries.filter((entry) => !!entry);
}

export async function getAllGallerySlugs(locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query AllGallerySlugs($site: [String]) {
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

export async function getGalleryData({
  gallery,
  filters,
  locale,
}: {
  gallery: string;
  filters: GalleryDataFilters;
  locale: string;
}) {
  const site = getSiteFromLocale(locale);
  const query = graphql(`
    query GalleryQuery(
      $site: [String]
      $uri: [String]
      $whereIn: [WhereInFiltersInput]
      $whereNotIn: [WhereNotInFiltersInput]
      $whereContainsIn: [WhereContainsInFilterInput]
      $forPage: ForPageInput
      $sortBy: SortByInput
      $sortByDesc: SortByDescInput
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
            sortBy: $sortBy
            sortByDesc: $sortByDesc
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
      sortBy: sortBy(filters),
      sortByDesc: sortByDesc(filters),
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
