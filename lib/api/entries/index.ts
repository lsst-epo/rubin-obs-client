import { gql } from "@urql/core";
import { env } from "@/env";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getEntriesByLocale(locale: string) {
  const site = getSiteFromLocale(locale);
  const ENV = env.CLOUD_ENV;

  const query = gql`
    query getEntriesBySite($site: [String], $level: Int) {
      entries(
        site: $site
        section: ["pages"]
        type: ["not", "redirectPage"]
        level: $level
      ) {
        uri
      }
    }
  `;
  const { data } = await queryAPI({
    query,
    variables: { site, level: ENV === "DEV" ? 1 : 0 },
  });

  return data;
}

export async function getEntrySectionByUri(uri = "__home__", locale: string) {
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
  });
  return data.entry;
}
