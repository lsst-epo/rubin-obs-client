import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import {
  DetailedAssetSchema,
  CantoAssetDetailed,
  BreadcrumbAssetSchema,
  SupportedCantoScheme,
} from "./schema";
import { addLocaleUriSegment } from "@/lib/i18n";
import { assetTitle } from "../canto/metadata";

export async function getRecentAssets(locale: string, gallery: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query RecentAssetsQuery(
      $site: [String]
      $uri: [String]
      $scheme: [String]
    ) {
      galleriesEntries(uri: $uri, site: $site) {
        ... on galleries_gallery_Entry {
          assetAlbum(whereIn: { key: "scheme", values: $scheme }) {
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
      scheme: SupportedCantoScheme.options,
    },
  });

  const assets: Array<{ asset: string }> = [];

  data?.galleriesEntries?.forEach((entry) => {
    entry?.assetAlbum?.forEach((album) => {
      if (album) {
        assets.push({ asset: (album as Record<string, string>).id });
      }
    });
  });

  return assets;
}

export async function getAssetBreadcrumb({
  locale,
  gallery,
  asset,
}: GalleryAssetProps["params"]) {
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
      uri: `gallery/${gallery}`,
      id: asset,
      scheme: SupportedCantoScheme.options,
    },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) {
    return [];
  }

  const { title, id, assetAlbum } = data.galleriesEntries[0];

  const basePath = `${addLocaleUriSegment(locale, {
    includeLeadingSlash: false,
    includeTrailingSlash: true,
  })}gallery/${gallery}`;

  if (title && id && assetAlbum) {
    const breadcrumbs = [{ title, uri: basePath, id }];

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
    variables: { site, uri: `gallery/${gallery}`, id },
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
