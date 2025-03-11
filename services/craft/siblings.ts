"server-only";
import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "@/lib/i18n/server";
import tags from "@/lib/api/client/tags";

export async function addSiblings(entryData: any) {
  if (!entryData) return null;

  const { uri, level, parent } = entryData;
  const parentId = parent?.id;
  return parentId ? await getSiblings(parentId, uri, level) : null;
}

export async function getSiblings(parentId: string, uri: string, level = 1) {
  const site = getSiteFromLocale(getLocale());

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
