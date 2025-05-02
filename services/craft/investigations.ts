"server-only";

import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { cantoSingleAsset } from "@/api/fragments/image";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "next-intl/server";

export async function addRelatedInvestigation(entryData) {
  if (!entryData || !entryData.id) return null;

  return getRelatedInvestigation(entryData);
}

export async function getRelatedInvestigation(entryData) {
  const site = getSiteFromLocale(await getLocale());
  if (!entryData) return null;

  const { id, ancestors = [] } = entryData;

  if (!id) return null;

  // Check if this page or any of it's ancestors have a related investigation
  const ids = [id].concat(ancestors.map((a) => a.id));

  const query = gql(`
    query RelatedInvestigation($site: [String], $ids: [QueryArgument]) {
      investigation: entry(type: "investigation", landingPage: $ids, site: $site) {
        sectionHandle
        ... on investigations_investigation_Entry {
          uri
          title
          duration: plainText
          typeHandle
          externalUrl: externalUrlTranslatable
          status: investigationStatus
          landingPage {
            ... on pages_investigationLandingPage_Entry {
              id
              uri
              title
            }
          }
          ${cantoSingleAsset}
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { ids, site } });

  return data;
}
