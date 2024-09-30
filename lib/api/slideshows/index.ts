import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { slideshowFragment } from "@/lib/api/fragments/slideshow";
import { getImageFields } from "@/lib/api/fragments/image";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getSlideshowDataByUri(
  uri: string,
  locale: string,
  previewToken?: string
) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${slideshowFragment}
    query getSlideshow($site: [String], $uri: [String]) {
      entry (section: "slideshows", site: $site, uri: $uri) {
        ...slideshowFragment

        ...on slideshows_slideshow_Entry {
          openGraphImage: representativeAssetVariant {
            ... on assetVariants_Asset {
              ${getImageFields("fit", 800)}
            }
          }
              items: slideshowItems {
            ... on slideshowItems_slide_BlockType {
              id
              title: slideTitle
              description: slideContent
              image: slideAsset {
                ... on assetVariants_Asset {
                  ${getImageFields("fit", 1000)}
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { uri, site },
    previewToken,
  });

  return data;
}
