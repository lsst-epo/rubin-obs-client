import { getSiteFromLocale } from "@/lib/helpers/site";

import queryAPI from "@/lib/api/client/query";
import { CRAFT_HOMEPAGE_URI } from "@/lib/constants";
import { graphql } from "@/gql";

export const getHomepage = async (locale: string) => {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query Homepage($site: [String], $uri: [String]) {
      entry(site: $site, uri: $uri) {
        ... on homepage_homepage_Entry {
          title
          id
          description
          pageType
          hero {
            ... on heroes_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 1920, height: 1067)
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
                ... on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 1920, height: 1067)
                }
              }
            }
          }
          contentBlocks {
            ...ContentBlocks
          }
          customHero {
            ... on customHero_customHero_BlockType {
              id
              flag
              header
              mixedLink {
                customText
                text
                title
                type
                url
                element {
                  uri
                }
              }
              teaser
              title
              image {
                ... on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 1920, height: 1067)
                }
              }
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri: CRAFT_HOMEPAGE_URI },
  });

  return data?.entry;
};

export default getHomepage;
