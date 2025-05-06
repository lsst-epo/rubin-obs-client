// "server-only";

import { client, CreateClientConfig } from "@/services/noirlab/client.gen";
import { RequestOptions } from "@hey-api/client-next";
import { env } from "@/env";
let accessToken = "";
const STAGING = "STAGING";
const EMBARGO = "EMBARGO";

client.interceptors.response.use(
  async (response: any, options: RequestOptions<boolean, string>) => {
    if (
      response.url.match(/noirlab.edu/g) &&
      (response.url.match(/releases/g) || response.url.match(/announcements/g))
    ) {
      const { query } = options;
      if (response.status === 404) {
        if (!("type" in query)) {
          if (accessToken == "") {
            accessToken = await getOauthToken();
          }

          if (accessToken) {
            let newResponse = await retryNoirlabRequest(
              accessToken,
              options,
              STAGING
            );
            if (newResponse != null) {
              return newResponse;
            }
          }
        } else if (query.type == STAGING) {
          if (accessToken == "") {
            accessToken = await getOauthToken();
          }
          if (accessToken) {
            let newResponse = await retryNoirlabRequest(
              accessToken,
              options,
              EMBARGO
            );
            if (newResponse != null) {
              return newResponse;
            }
          }
        }
      }
    }

    return response;
  }
);

async function getOauthToken(): Promise<string> {
  let accessToken = "";
  await fetch(env.NOIRLAB_OAUTH_AUTH_URL, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${env.NOIRLAB_OAUTH_CREDENTIALS}`,
      "Cache-Control": "no-cache",
      "Content-Type": " application/x-www-form-urlencoded",
    },
  })
    .then((body) => {
      return body.json();
    })
    .then(async (data) => {
      accessToken = data?.access_token || "";
    });
  return accessToken;
}

async function retryNoirlabRequest(accessToken, options, type) {
  const { query, path } = options;
  if (accessToken) {
    query.type = type;
    const retryResponse = await client.request({
      path,
      query,
      url: options.url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    return null;
  }
}

export { client };
