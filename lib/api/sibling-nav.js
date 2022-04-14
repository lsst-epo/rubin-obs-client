import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function addSiblings(entryData, site = "default") {
  if (!entryData) return null;

  const { uri, level } = entryData;

  const siblings = await getSiblings(uri, level, site);

  return Object.assign(entryData, { siblings });
}

export async function getSiblings(uri, level = 1, site = "default") {
  const query = gql`
      {
        siblings: entry (uri: "${uri}", site: "${site}") {
            prev(section: "pages", site: "${site}", level: ${level}) {
                uri
                title
            }
            next(section: "pages", site: "${site}", level: ${level}) {
                uri
                title
            }
        }
    }`;

  const data = await queryAPI(query);

  return data.siblings;
}
