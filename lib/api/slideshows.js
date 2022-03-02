import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { slideshowFragment } from "@/lib/api/fragments/slideshow";
import { getImageFields } from "@/lib/api/fragments/image";

export async function getSlideshowDataByUri(
  uri,
  site = "default",
  previewToken
) {
  const query = gql`
    ${slideshowFragment}
    {
      entry (section: "slideshows", site: "${site}", uri: "${uri}") {
        ...slideshowFragment

        ...on slideshows_slideshow_Entry {
          featuredImage: representativeAssetVariant {
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
  const data = await queryAPI(query, null, previewToken);
  return { entry: data.entry };
}
