import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getEntriesByLocale(locale: string) {
  const site = getSiteFromLocale(locale);
  const ENV = process.env.CLOUD_ENV;

  if (ENV === "DEV") {
    const query = gql`
      query getEntriesBySite($site: [String]) {
        entries(
          site: $site
          section: ["pages", "searchResults"]
          type: ["not", "redirectPage"]
          level: 1
        ) {
          uri
        }
        search: entries(
          site: $site
          section: ["searchResults"]
          type: ["not", "redirectPage"]
        ) {
          uri
        }
      }
    `;
    const { data } = await queryAPI({ query, variables: { site } });

    return { entries: [...data.entries, ...data.search] };
  } else {
    const query = gql`
      query getEntriesBySite($site: [String]) {
        entries(
          site: $site
          section: ["pages", "searchResults"]
          type: ["not", "redirectPage"]
        ) {
          uri
        }
      }
    `;

    const { data } = await queryAPI({ query, variables: { site } });
    return data;
  }
}

export async function getEntrySectionByUri(
  uri = "__home__",
  locale: string,
  previewToken?: string
) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    query getEntrySectionByUri($site: [String], $uri: [String]) {
      entry(uri: $uri, site: $site) {
        sectionHandle
        typeHandle
      }
    }
  `;
  const { data } = await queryAPI({
    query,
    variables: { uri: decodeURI(uri), site },
    previewToken,
  });
  return data.entry;
}
