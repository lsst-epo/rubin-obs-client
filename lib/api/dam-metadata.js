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
    
      assets {
        ... on cantoDam_Asset {
          id
          url
          title
        }
      }
    }
  `;
  const data = await queryAPI(query);

  // Remove extraneous empty rows and convert metadata array to map
  const metadataMap = new Map();

  data.metadata.forEach(e => {
    if(e.damMetadata != null && e.assetId != null) {
      metadataMap.set(e.assetId, e.damMetadata);
    }
  });

  const filteredAssets = data.assets.filter(e => {
    if(Object.keys(e).length > 0) {
      return e;
    }
  });

  // Normalize two object arrays
  const normalizedAssets = filteredAssets.map(e => {
    return {...e, damMetadata: metadataMap.get(parseInt(e.id))}
  });

  console.log("logging normalizedAssets from inside getDAMMetadata");
  console.log(normalizedAssets);
  console.log(normalizedAssets[0].damMetadata[0])
  // console.log("logging filteredAssets from inside getDAMMetadata");
  // console.log(filteredAssets);
  return data === undefined ? { metadata: undefined } : data;
}
