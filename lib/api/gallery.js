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
  const data = await queryAPI(query, null, previewToken);
  return { entry: data.entry, globals: data.globals[0] };
}

export async function addGalleryAssets(entryData) {
  if (
    !entryData ||
    entryData.pageType !== "dynamic" ||
    entryData.dynamicComponent !== "galleryItems"
  )
    return null;

  const params = new URLSearchParams({ album_id: "HDSNU", limit: 10 });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/canto-assets?${params.toString()}`
  );
  try {
    const json = await data.json();
    return Object.assign(entryData, { gallery: json });
  } catch (error) {
    return entryData;
  }
}
