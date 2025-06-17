import { gql } from "@urql/core";
import { env } from "@/env";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { graphql } from "@/gql";

export async function getEntriesByLocale(locale: string) {
  const site = getSiteFromLocale(locale);
  const isDev = env.CLOUD_ENV === "DEV";

  const query = graphql(`
    query getEntriesBySite($site: [String], $level: Int, $limit: Int) {
      pagesEntries(site: $site, type: ["not", "redirectPage"], level: $level) {
        ... on pages_galleryLandingPage_Entry {
          uri
        }
        ... on pages_educatorPages_Entry {
          uri
        }
        ... on pages_pages_Entry {
          uri
        }
        ... on pages_studentPages_Entry {
          uri
        }
        ... on pages_investigationLandingPage_Entry {
          uri
        }
      }
      newsEntries(limit: $limit) {
        ... on news_post_Entry {
          uri
        }
      }
      slideshowsEntries(limit: $limit) {
        ... on slideshows_slideshow_Entry {
          uri
        }
      }
      eventsEntries(limit: $limit) {
        ... on events_events_Entry {
          uri
        }
      }
    }
  `);
  const { data } = await queryAPI({
    query,
    variables: { site, level: isDev ? 1 : 0, limit: 25 },
  });

  if (!data) return [];

  const { pagesEntries, newsEntries, slideshowsEntries, eventsEntries } = data;

  const entries: Array<{ uriSegments: Array<string> }> = [];

  [pagesEntries, newsEntries, slideshowsEntries, eventsEntries].forEach(
    (set) => {
      if (set !== null) {
        set.forEach((entry) => {
          if (entry && entry.uri) {
            entries.push({ uriSegments: entry.uri.split("/") });
          }
        });
      }
    }
  );

  return entries;
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
