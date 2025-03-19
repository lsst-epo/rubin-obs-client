import { GraphQLClient } from "graphql-request";
import { env } from "@/env";

export async function queryAPI(query, token, previewToken, variables = {}) {
  const API_URL = env.NEXT_PUBLIC_API_URL;

  const isPreview = previewToken && previewToken !== "";
  const url = isPreview ? `${API_URL}?token=${previewToken}` : API_URL;
  const client = new GraphQLClient(url);
  const headers = !token
    ? {}
    : {
        authorization: `JWT ${token}`,
      };

  return client
    .request(query, variables, headers)
    .then((data) => data)
    .catch((error) => {
      process.exitCode = -99;
      console.warn("Error in fetch.js :");
      console.warn(error);
      return error.response;
    });
}
