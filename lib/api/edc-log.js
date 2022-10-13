import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function setEdcLog(
  runId,
  notes,
  category,
  appName = "rubin-obs-client"
) {
  const query = gql`
        mutation AddLog {
            addEdcLog(runId:"${runId}", appName:"${appName}", notes:"${notes}", category:"${category}") { 
                edc_logger_id 
            }
        }
  `;

  await queryAPI(query, null, false, true);
}
