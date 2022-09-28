import { GraphQLClient } from "graphql-request";

export async function queryAPI(query, token, previewToken) {
  let API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Check to see if the environment variable DOCKER_GATEWAY_IP is populated, if so
  // then the URL should be constructed for a Docker static build
  if (
    process.env.DOCKERIZED &&
    process.env.DOCKER_GATEWAY_IP &&
    parseInt(process.env.DOCKER_GATEWAY_IP) !== -1 && // The getApiGatewayURL script returns -1 if an error occurs grabbing the IP
    process.env.DOCKER_GATEWAY_PORT
  ) {
    API_URL = `http://${process.env.DOCKER_GATEWAY_IP}:${process.env.DOCKER_GATEWAY_PORT}/api`;
  }

  const isPreview = previewToken && previewToken !== "";
  const url = isPreview ? `${API_URL}?token=${previewToken}` : API_URL;

  const client = new GraphQLClient(url);
  const headers = !token
    ? {}
    : {
        authorization: `JWT ${token}`,
      };

  return client
    .request(query, {}, headers)
    .then((data) => data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error in fetch.js :");
      console.warn(error);
      return error.response;
    });
}

function handleError(error, description) {
  throw new Error(`${error}: ${description}`, {
    cause: description,
  });
}

export async function queryCantoAPI({ url, params = {}, options }) {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`${url}?${urlParams.toString()}`, options);
  try {
    const json = await response.json();
    if (!response.ok) {
      const error = json.error || response.status;
      const message = json.error_description || response.statusText;
      handleError(error, message);
    }
    return json;
  } catch (error) {
    if (error.name === "FetchError") {
      handleError(response.status, response.statusText);
    } else {
      throw new Error(error.message, { cause: error.cause });
    }
  }
}
