import { queryAPI } from "@/lib/fetch";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { fallbackLng } from "@/lib/i18n/settings";
import { gql } from "graphql-request";

export async function getEntryMetadataByUri(
  uri: string,
  locale = fallbackLng,
  previewToken?: string
) {
  const site = getSiteFromLocale(locale);

  const query = gql`
    query EntryMetadata($site: [String], $uri: [String]) {
      entry(site: $site, uri: $uri) {
        ... on homepage_homepage_Entry {
          title
          description
        }
        ... on events_events_Entry {
          title
          description
        }
        ... on pages_pages_Entry {
          title
          description
        }
        ... on pages_educatorPages_Entry {
          description
          title
        }
        ... on pages_studentPages_Entry {
          description
          title
        }
        ... on pages_investigationLandingPage_Entry {
          description
          title
        }
      }
    }
  `;

  return queryAPI(query, undefined, previewToken, { site, uri });
}
