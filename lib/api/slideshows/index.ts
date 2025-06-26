import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { slideshowFragment } from "@/lib/api/fragments/slideshow";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getSlideshowDataByUri(uri: string, locale: string) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${slideshowFragment}
    query getSlideshow($site: [String], $uri: [String]) {
      entry(section: "slideshows", site: $site, uri: $uri) {
        ...slideshowFragment

        ... on slideshows_slideshow_Entry {
          openGraphImage: representativeAssetVariant {
            ... on assetVariants_Asset {
              altText
              width
              height
              url @transform(mode: "fit", width: 900)
            }
          }
          items: slideshowItems {
            ... on slideshowItems_slide_BlockType {
              id
              title: slideTitle
              description: slideContent
              image: slideAsset {
                ... on assetVariants_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "fit", width: 1000)
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
  });

  return data;
}
