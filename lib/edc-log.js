import { GraphQLClient, gql } from "graphql-request";

export async function setEdcLog(
  runId,
  notes,
  category,
  appName = "rubin-obs-client"
) {
  const API_URL = process.env.EDC_LOGGER_API_URL;

  const query = gql`
        mutation AddLog {
            addEdcLog(runId:"${runId}", appName:"${appName}", notes:"${notes}", category:"${category}") { 
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
