import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { DetailedAssetSchema, CantoAssetDetailed } from "./schema";

export async function getRecentAssets(locale: string, gallery: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query RecentAssetsQuery($site: [String], $uri: [String]) {
      galleriesEntries(uri: $uri, site: $site) {
        ... on galleries_gallery_Entry {
          assetAlbum {
            id
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri: `gallery/${gallery}` },
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

export async function getAssetGalleryTitle(gallery: string, locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query GalleryTitleQuery($site: [String], $uri: [String]) {
      galleriesEntries(uri: $uri, site: $site) {
        ... on galleries_gallery_Entry {
          title
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri: `gallery/${gallery}` },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) {
    return undefined;
  }

  return data.galleriesEntries[0].title || undefined;
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
