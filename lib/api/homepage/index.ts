import { gql } from "@urql/core";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getImageFields } from "@/lib/api/fragments/image";
import {
  allPageBlocks,
  allPageBlocksFragment,
} from "@/lib/api/fragments/content-blocks";
import { getLinkFields, linkFragment } from "@/lib/api/fragments/link";
import queryAPI from "@/lib/api/client/query";

const CRAFT_HOMEPAGE_URI = "__home__";

export const getHomepage = async (locale: string, previewToken?: string) => {
  const site = getSiteFromLocale(locale);

  const query = gql`
    ${linkFragment}
    ${allPageBlocksFragment}
    query Homepage($site: [String], $uri: [String]) {
      entry(site: $site, uri: $uri) {
        ...on homepage_homepage_Entry {
          id
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
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { site, uri: CRAFT_HOMEPAGE_URI },
    previewToken,
  });

  return data?.entry;
};

export const getHomepageMetadata = async (
  locale: string,
  previewToken?: string
) => {
  const site = getSiteFromLocale(locale);

  const query = gql`
    query HomepageMetadata($site: [String], $uri: [String]) {
      entry(site: $site, uri: $uri) {
        ... on homepage_homepage_Entry {
          title
          description
        }
      }
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { site, uri: CRAFT_HOMEPAGE_URI },
    previewToken,
  });

  return data;
};

export default getHomepage;
