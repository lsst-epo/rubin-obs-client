import { GraphQLClient, gql } from "graphql-request";

export async function setEdcLog(
  runId,
  notes,
  category,
  appName = "rubin-obs-client"
) {
  const API_URL = process.env.EDC_LOGGER_API_URL;

  if (!API_URL || !process.env.NEXT_PUBLIC_DEBUG_LOGGING) return;

  const env = process.env.CLOUD_ENV ? process.env.CLOUD_ENV : "UNKNOWN";

  const query = gql`
        mutation AddLog {
            addEdcLog(runId:"${runId}", appName:"${appName}", notes:"${notes}", category:"${category}", environment: "${env}") { 
                edc_logger_id 
            }
        }
  `;

  const client = new GraphQLClient(API_URL);

  await client
    .request(query, {}, {})
    .then((data) => data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error in edc-log.js :");
      console.warn(error);
      return error.response;
    });
}
