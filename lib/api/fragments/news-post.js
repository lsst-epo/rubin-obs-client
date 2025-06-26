import { fullBaseFields } from "@/lib/api/fragments/shared";

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
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 900, height: 550)
        }
      }
      hero {
        ...on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 900, height: 550)
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
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 800, height: 600)
        }
      }
    }
  }
`;
