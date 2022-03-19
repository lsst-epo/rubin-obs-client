import { getImageFields } from "@/lib/api/fragments/image";
import { getLinkFields } from "@/api/fragments/link";

export const homepageFragmentFull = `
fragment homepageFragmentFull on homepage_homepage_Entry {
    id
    title
    language
    localized {
    uri
    language
    }
    ...on homepage_homepage_Entry {
        description
        pageType
        hero {
            ...on heroes_Asset {
                ${getImageFields("crop", 1920, 1067)}
                focalPointX
                focalPointY
            }
        }
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
                    focalPointX
                    focalPointY
                }
            }
           }
          }
        contentBlocks {
          ...accordionGroupBlock
          ...calloutBlock
          ...contactBlock
          ...ctaGridBlock
          ...imageBlock
          ...linkBlock
          ...newsBlock
          ...relatedContentBlock
          ...scheduleBlock
          ...shareBlock
          ...simpleTableBlock
          ...slideBlock
          ...staffGridBlock
          ...textBlock
          ...videoBlock
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
              focalPointX
              focalPointY
            }
          }
        }
      }

    }
}
`;
