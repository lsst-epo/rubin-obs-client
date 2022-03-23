import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function getAllStudentPageUrls(lang = "default") {
  const query = gql`
    {
      entries (section: "studentPages", site: "${lang}") {
        id
        title
        uri
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entries;
}

export async function getStudentPageUrlByUid(uid, site) {
  const query = gql`
    {
      entry (uid: "${uid}" site: "${site}") {
        url
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entry;
}

export async function getBreadcrumbs(id, site = "default", previewToken) {
  if (!id) return null;
  const query = gql`
    {
      entries(section: "studentPages", site: "${site}", ancestorOf: ${id}) {
        ... on pages_studentPages_Entry {
          id
          title
          uri
        }
      }
    }
  `;
  const data = await queryAPI(query, null, previewToken);
  return data.entries;
}
