import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { CantoDetailedAsset } from "types/canto";

export async function getAssetFromGallery(
  galleryUri: string,
  id: string,
  locale: string
) {
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
    variables: { site, uri: galleryUri, id },
  });

  if (!data || !data.galleriesEntries || !data.galleriesEntries[0]) {
    return undefined;
  }

  const gallery = data.galleriesEntries[0];

  if (!gallery.assetAlbum || !gallery.assetAlbum[0]) {
    return undefined;
  }

  return gallery.assetAlbum[0] as CantoDetailedAsset;
}
