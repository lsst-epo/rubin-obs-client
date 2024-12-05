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
      pressReleaseId
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 900, 550)}
        }
      }
      hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 900, 550)}
        }
      }
      postType {
        id
        title
        slug
      }
      newsAssets: sidebarAssets {
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

export const newsPostFragmentFull = `
  fragment newsPostFragmentFull on news_post_Entry {
    ...on news_post_Entry {
      date
      dateCreated
      description: teaser
      pressReleaseId
      siteHandle
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
      focalPointX
      focalPointY
      heroCaption: captionRichText
      newsAssets: sidebarAssets {
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
      pressReleaseId
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
    }
  }
`;
