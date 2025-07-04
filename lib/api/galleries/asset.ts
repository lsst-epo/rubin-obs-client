import { graphql } from "@/gql/gql";
import { getLocale } from "next-intl/server";
import sample from "lodash/sample";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import {
  DetailedAssetSchema,
  CantoAssetDetailed,
  BreadcrumbAssetSchema,
  SupportedCantoScheme,
  UnsupportedCantoScheme,
  GalleryDataFilters,
} from "./schema";
import { addLocaleUriSegment } from "@/lib/i18n";
import { assetTitle } from "../canto/metadata";
import z from "zod";
import { getGalleryData, getMainGallery } from ".";
import tags from "../client/tags";

export async function getFirstPageAssets(locale: string, gallery: string) {
  const filters: GalleryDataFilters = {
    page: 1,
    limit: 30,
    type: SupportedCantoScheme.options,
    sort: "desc",
    tag: [],
  };

  const data = await getGalleryData({ gallery, locale, filters });
  const slugs =
    data?.assetAlbum.map(({ id }) => {
      return { asset: id };
    }) || [];

  return slugs;
}

export async function getAssetBreadcrumb({
  locale,
  gallery,
  asset,
  hasParentSlug,
}: GalleryAssetProps["params"] & { hasParentSlug: boolean }) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query GalleryTitleQuery(
      $site: [String]
      $uri: [String]
      $id: String
      $scheme: [String]
    ) {
      galleriesEntries(uri: $uri, site: $site) {
        ... on galleries_gallery_Entry {
          id
          title
          assetAlbum(
            whereIn: { key: "scheme", values: $scheme }
            where: { key: "id", value: $id }
          ) {
            additional {
              TitleEN
              TitleES
            }
            id
            name
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
      id: asset,
      scheme: SupportedCantoScheme.options,
    },
    fetchOptions: { next: { tags: [gallery] } },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) {
    return [];
  }

  const { title, id, assetAlbum } = data.galleriesEntries[0];

  const basePath = addLocaleUriSegment(
    locale,
    `/gallery/collections/${gallery}`,
    {
      includeLeadingSlash: false,
    }
  );

  const parentPath = hasParentSlug
    ? basePath
    : basePath.split("/").slice(0, -2).join("/");

  if (title && id && assetAlbum) {
    const breadcrumbs = [{ title, uri: parentPath, id }];

    const { data: parsedAsset } = BreadcrumbAssetSchema.safeParse(
      assetAlbum[0]
    );

    if (parsedAsset) {
      breadcrumbs.push({
        title: assetTitle(parsedAsset.additional) || parsedAsset.name,
        uri: `${basePath}/${asset}`,
        id: parsedAsset.id,
      });
    }

    return breadcrumbs;
  }

  return [];
}

export async function getAssetFromGallery(
  gallery: string,
  id: string,
  locale: string
): Promise<CantoAssetDetailed | undefined> {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {
      galleriesEntries(uri: $uri, site: $site) {
        ... on galleries_gallery_Entry {
          assetAlbum(where: { key: "id", value: $id }) {
            additional {
              AltTextEN
              AltTextES
              CaptionEN
              CaptionES
              Credit
              TitleEN
              TitleES
            }
            default {
              ContentType
              DateCreated
              DateModified
              DateUploaded
              Size
            }
            approvalStatus
            height
            id
            keyword
            name
            owner
            ownerName
            scheme
            size
            smartTags
            tag
            time
            url {
              directUrlOriginal
              directUrlPreview
              directUrlPreviewPlay
              download
              metadata
              preview
              PNG
              HighJPG
            }
            width
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri: `gallery/collections/${gallery}`, id },
    fetchOptions: {
      next: {
        tags: [gallery],
      },
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) {
    return undefined;
  }

  const parentGallery = data.galleriesEntries[0];

  if (!parentGallery.assetAlbum || !parentGallery.assetAlbum[0]) {
    return undefined;
  }

  const { data: parsedData, error } = DetailedAssetSchema.safeParse(
    parentGallery.assetAlbum[0]
  );

  if (parsedData && !error) {
    return parsedData;
  }
}

export const getRandomAsset = async () => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query RandomAssetQuery($site: [String], $scheme: [String]) {
      galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          title
          slug
          assetAlbum(
            random: 1
            whereNotIn: { key: "scheme", values: $scheme }
          ) {
            additional {
              AltTextEN
              AltTextES
              CaptionEN
              CaptionES
              Credit
              TitleEN
              TitleES
            }
            default {
              ContentType
              DateCreated
              DateModified
              DateUploaded
              Size
            }
            approvalStatus
            height
            id
            name
            owner
            ownerName
            scheme
            size
            smartTags
            tag
            time
            url {
              directUrlOriginal
              directUrlPreview
              directUrlPreviewPlay
              download
              metadata
              preview
              PNG
              HighJPG
            }
            width
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, scheme: UnsupportedCantoScheme.options },
    fetchOptions: {
      next: {
        revalidate: 60 * 60 * 12,
      },
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) return;

  const { galleriesEntries } = data;

  const galleriesWithImages = galleriesEntries.filter((gallery) => {
    return gallery?.assetAlbum && gallery?.assetAlbum.length > 0;
  });

  const gallery = sample(galleriesWithImages);

  if (!gallery || !gallery.assetAlbum) return;

  const { title, slug } = gallery;
  const { data: asset, error } = DetailedAssetSchema.safeParse(
    gallery.assetAlbum[0]
  );

  return { title, slug, asset };
};

const linkedPostSchema = z.array(
  z.object({ title: z.string(), uri: z.string(), id: z.string() })
);

export const getLinkedPosts = async (id: string) => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query LinkedPosts($site: [String], $id: String) {
      newsEntries(site: $site) {
        ... on news_post_Entry {
          id
          uri
          title
          sidebarAssets(type: "associatedAsset") {
            ... on sidebarAssets_associatedAsset_BlockType {
              __typename
              asset(where: { key: "id", value: $id }) {
                id
              }
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, id },
  });

  if (!data || !data.newsEntries) return [];

  const linkedPosts = data.newsEntries.filter((entry) => {
    return (
      entry &&
      entry.sidebarAssets.some((sidebarAsset) => {
        return (
          sidebarAsset &&
          sidebarAsset.__typename ===
            "sidebarAssets_associatedAsset_BlockType" &&
          sidebarAsset.asset &&
          sidebarAsset.asset.length > 0
        );
      })
    );
  });

  const { data: parsedLinkedPosts = [] } =
    linkedPostSchema.safeParse(linkedPosts);

  return parsedLinkedPosts;
};

export const getGalleryForAsset = async (id: string) => {
  const locale = await getLocale();
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query GalleryForAsset($site: [String], $id: String) {
      galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          uri
          slug
          assetAlbum(where: { key: "id", value: $id }) {
            id
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, id },
    fetchOptions: { next: { tags: [tags.gallery] } },
  });

  if (!data || !data.galleriesEntries) return;

  const { galleriesEntries } = data;

  const mainGallery = await getMainGallery(locale);

  const galleriesWithAsset = galleriesEntries.filter(
    (entry) => entry && entry.assetAlbum && entry.assetAlbum.length > 0
  );

  if (mainGallery) {
    const mainGalleryWithAsset = galleriesWithAsset.find(
      (entry) => entry?.slug === mainGallery.gallery
    );

    if (mainGalleryWithAsset) {
      return mainGalleryWithAsset.uri || undefined;
    }
  }

  const [firstGallery] = galleriesWithAsset;

  return firstGallery?.uri || undefined;
};
