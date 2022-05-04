import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function getDAMMetadata() {
  const query = gql`
    {
      metadata: enhancedAssetsQuery {
        damMetadata {
          metadataKey
          metadataValue
        }
        assetId
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}
