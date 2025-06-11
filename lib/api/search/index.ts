import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getSearchPage(locale: string) {
  const site = getSiteFromLocale(locale);
  const query = graphql(`
    query SearchResultsPage($site: [String]) {
      searchResultsEntries(site: $site) {
        ... on searchResults_searchResults_Entry {
          title
          id
          dynamicComponent
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });

  if (!data) return;

  const { searchResultsEntries } = data;

  if (!searchResultsEntries || !searchResultsEntries[0]) return;

  return searchResultsEntries[0];
}
