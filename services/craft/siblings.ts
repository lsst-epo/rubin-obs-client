"server-only";
import { getLocale } from "next-intl/server";
import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/server";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "@/lib/api/client/tags";

export async function getSiblings(parentId: string, uri: string, level = 1) {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query GetSiblings(
      $uri: [String]
      $site: [String]
      $parentId: Int
      $level: Int
    ) {
      siblings: entry(uri: $uri, site: $site) {
        prev(
          descendantOf: $parentId
          section: "pages"
          site: $site
          level: $level
        ) {
          uri
          title
        }
        next(
          descendantOf: $parentId
          section: "pages"
          site: $site
          level: $level
        ) {
          uri
          title
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri, level, parentId: parseInt(parentId) },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  return data;
}
