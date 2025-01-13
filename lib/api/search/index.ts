import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getSearchEntry(locale: string, previewToken?: string) {
  const site = getSiteFromLocale(locale);
  const query = graphql(`
    query SearchResultsPage($site: [String]) {
      searchResultsEntries {
        ... on searchResults_searchResults_Entry {
          title
          id
          dynamicComponent
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site }, previewToken });

  if (!data) return;

  const { searchResultsEntries } = data;

  if (!searchResultsEntries || !searchResultsEntries[0]) return;

  return searchResultsEntries[0];
}
