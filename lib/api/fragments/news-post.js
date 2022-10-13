import { getImageFields } from "@/lib/api/fragments/image";

export const newsPostFragment = `
  fragment newsPostFragment on news_post_Entry {
    id
    title
    language
    localized {
      uri
      language
    }
    uri
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
    id
    title
    language
    localized {
      uri
      language
    }
    uri
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
        ...textBlockNews
        ...imageBlockNews
        ...linkBlockNews
        ...contactBlockNews
        ...relatedContentBlockNews
        ...videoBlockNews
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
