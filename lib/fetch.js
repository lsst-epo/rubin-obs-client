export async function queryAPI(query, token, previewToken, variables = {}) {
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
  const url = variables
    ? `${API_URL}?variables=${JSON.stringify(variables)}`
    : API_URL;
  const urlWithToken = isPreview ? `${url}&token=${previewToken}` : url;
  const headers = !token
    ? {
        "Content-Type": "application/graphql",
      }
    : {
        "Content-Type": "application/graphql",
        authorization: `JWT ${token}`,
      };

  const results = await fetch(urlWithToken, {
    method: "POST",
    headers,
    body: query,
  })
    .then((res) => res.json())
    .then((json) => json?.data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error in fetch.js :");
      console.warn(error);
      return error.response;
    });

  return results;
}
