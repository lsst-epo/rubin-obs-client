import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allNewsBlocks } from "@/lib/api/fragments/content-blocks";

export const newsPostFragment = `
  fragment newsPostFragment on news_post_Entry {
    ${fullBaseFields}
    url
    ...on news_post_Entry {
      date
      dateCreated
      description: teaser
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 450, 275)}
        }
      }
      postType {
        id
        title
        slug
      }
      newsAssets {
        ... on newsAssets_textLink_BlockType {
          text
          textLink {
            url
          }
        }
      }
    }
  }
`;

export const newsPostFragmentFull = `
  fragment newsPostFragmentFull on news_post_Entry {
    ...on news_post_Entry {
      date
      dateCreated
      description: teaser
      postType {
        id
        title
        slug
      }
      postTags {
        ... on newsTags_Tag {
          slug
          title
        }
      }
      hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 1920, 1067)}
        }
      } 
      featuredImage: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 800, 800)}
        }
      }
      newsAssets {
        ... on newsAssets_header_BlockType {
          assetHeader
        }
        ... on newsAssets_textLink_BlockType {
          text
          textLink {
            url
          }
        }
        ... on newsAssets_externalLink_BlockType {
          text
          externalLink
        }
        ... on newsAssets_image_BlockType {
          image {
            ... on contentImages_Asset {
            ${getImageFields("crop", 450, 275)}
            }
          }
        }
        ... on newsAssets_galleryItem_BlockType {
          galleryItem {
            uri
            ... on galleryItems_galleryItem_Entry {
              representativeAssetVariant {
                ... on assetVariants_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
          }
        }
      }
      contentBlocksNews {
        ${allNewsBlocks}
      }    
    }
  }
`;

export const newsPostFragmentRSS = `
  fragment newsPostFragmentRSS on news_post_Entry {
    sectionHandle
    url
    title
    date: dateUpdated
    ... on news_post_Entry {
      description: teaser
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
    }
  }
`;
