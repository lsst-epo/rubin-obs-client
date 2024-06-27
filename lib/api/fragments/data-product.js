import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const dataProductFragment = `
  fragment dataProductFragment on dataProducts_dataProduct_Entry {
    ${fullBaseFields}
    url
    ...on dataProducts_dataProduct_Entry {
      dateCreated
      description
      image: featuredImage {
        ...on contentImages_Asset {
          ${getImageFields("crop", 900, 550)}
        }
      }
      sidebarAssets {
        ... on sidebarAssets_textLink_BlockType {
          text
          textLink {
            url
          }
        }
      }
    }
  }
`;

export const dataProductFragmentFull = `
  fragment dataProductFragmentFull on dataProducts_dataProduct_Entry {
    ...on dataProducts_dataProduct_Entry {
      dateCreated
      description
      siteHandle
      featuredImage {
        ...on contentImages_Asset {
          ${getImageFields("crop", 800, 800)}
        }
      }
      sidebarAssets {
        ... on sidebarAssets_header_BlockType {
          assetHeader
        }
        ... on sidebarAssets_textLink_BlockType {
          text
          textLink {
            url
          }
        }
        ... on sidebarAssets_externalLink_BlockType {
          text
          externalLink
        }
        ... on sidebarAssets_image_BlockType {
          image {
            ... on contentImages_Asset {
            ${getImageFields("crop", 900, 550)}
            }
          }
          caption
        }
        ... on sidebarAssets_galleryItem_BlockType {
          galleryItem {
            uri
            ... on galleryItems_galleryItem_Entry {
              representativeAssetVariant {
                ... on assetVariants_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
            }
          }
        }
      }
      contentBlocks {
        ${allPageBlocks}
      }
    }
  }
`;
