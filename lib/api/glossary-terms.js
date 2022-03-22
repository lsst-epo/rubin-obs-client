import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { glossaryTermFragmentFull } from "@/lib/api/fragments/glossary-term";

export async function getGlossaryTermDataByUri(
  uri,
  site = "default",
  previewToken
) {
  const query = gql`
    ${glossaryTermFragmentFull}
    {
      entry (section: "glossaryTerms", site: "${site}", uri: "${uri}") {
        ...glossaryTermFragmentFull
      }
    }
  `;
  const data = await queryAPI(query, previewToken);
  return { entry: data.entry };
}
