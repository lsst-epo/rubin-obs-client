import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { galleryItemFragment } from "@/lib/api/fragments/gallery-item";
import { getImageFields } from "@/lib/api/fragments/image";

export async function getGalleryItemDataByUri(
  uri,
  site = "default",
  previewToken
) {
  const query = gql`
    ${galleryItemFragment}
    {
      entry (section: "galleryItems", site: "${site}", uri: "${uri}") {
        ...galleryItemFragment

        ... on galleryItems_galleryItem_Entry {
          richTextDescription
          credit
          metadataDate
          metadataVersion
          publisher
          publisherId
          customDateCreated
          usageTerms
          videoUrl: externalUrl
          featuredImage: representativeAssetVariant {
            ... on assetVariants_Asset {
            ${getImageFields("crop", 1000, 670)}
            }
          }
          subLocation {
            title
            ... on location_Category {
              address
              city
              state
              country
            }
          }      
          assetVariants {
            ... on assetVariants_header_BlockType {
              id
              assetHeader
            }
            ... on assetVariants_asset_BlockType {
              id
              assetName
              assetLink {
                id
                width
                height
                size
                kind
                url
              }
              commonName
            }
          }
        }
    
      }
      globals: globalSets(handle: "galleryItemDefaults") {
        ... on galleryItemDefaults_GlobalSet {
          creditDefault
          metadataVersionDefault
          publisherDefault
          publisherIdDefault
          usageTermsDefault
        }
      }
    }
  `;
  const data = await queryAPI(query, previewToken);
  return { entry: data.entry, globals: data.globals[0] };
}

// assets {
//   id
//   filename
//   kind
//   ... on assetVariants_Asset {
//     metadata {
//       format
//     }
//   }
// }
