import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function addSiblings(entryData, site = "default") {
  if (!entryData) return null;

  const { uri, level, parent } = entryData;
  const parentId = parent?.id;
  const siblings = parentId
    ? await getSiblings(parentId, uri, level, site)
    : null;
  return Object.assign(entryData, { siblings });
}

export async function getSiblings(parentId, uri, level = 1, site = "default") {
  const query = gql`
      {
        siblings: entry (uri: "${uri}", site: "${site}") {
            prev(descendantOf: ${parentId}, section: "pages", site: "${site}", level: ${level}) {
                uri
                title
            }
            next(descendantOf: ${parentId}, section: "pages", site: "${site}", level: ${level}) {
                uri
                title
            }
        }
    }`;

  const data = await queryAPI(query);

  return data.siblings;
}
