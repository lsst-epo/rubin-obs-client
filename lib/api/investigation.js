import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { getImageFields } from "@/api/fragments/image";

export async function addRelatedInvestigation(entryData, site) {
  if (!entryData || !entryData.id) return null;

  const investigation = await getRelatedInvestigation(entryData, site);

  return Object.assign(entryData, { investigation });
}

export async function getRelatedInvestigation(entryData, site = "default") {
  if (!entryData) return null;

  const { id, ancestors = [] } = entryData;

  if (!id) return null;

  // Check if this page or any of it's ancestors have a related investigation
  const ids = [id, ...ancestors.map((a) => a.id)];

  const query = gql`
    {
      investigation: entry(type: "investigation", landingPage: [${ids}], site: "${site}") {
        sectionHandle
        ... on investigations_investigation_Entry {
          uri
          title
          duration: plainText
          typeHandle
          externalUrl
          isActive
          landingPage {
            ... on pages_investigationLandingPage_Entry {
              uri
              title
            }
          }
          damAsset {
            height
            width
            damMetadata {
              metadataKey
              metadataValue
            }
          }
        }
      }
    }
  `;

  const data = await queryAPI(query);

  return data.investigation;
}
