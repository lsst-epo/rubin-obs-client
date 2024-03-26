import { getImageFields } from "@/lib/api/fragments/image";
import { getLinkFields } from "@/api/fragments/link";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const homepageFragmentFull = `
fragment homepageFragmentFull on homepage_homepage_Entry {
  ...on homepage_homepage_Entry {
    description
    pageType
    hero {
      ...on heroes_Asset {
        ${getImageFields("crop", 1920, 1067)}
      }
    }
    focalPointX
    focalPointY
    newsEntry {
      ... on news_post_Entry {
        id
        date
        title
        teaser
        uri
        postType {
          ... on newsFilters_Category {
            slug
          }
        }
        hero {
          ...on heroes_Asset {
            ${getImageFields("crop", 1920, 1067)}
          }
        }
      }
    }
    contentBlocks {
      ${allPageBlocks}
    }
    customHero {
      ... on customHero_customHero_BlockType {
        id
        flag
        header
        mixedLink {
          ${getLinkFields()}
        }
        teaser
        title
        image {
          ... on heroes_Asset {
            ${getImageFields("crop", 1920, 1067)}
          }
        }
      }
    }
  }
}
`;
