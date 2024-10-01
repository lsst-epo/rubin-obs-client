import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import type { AnyVariables, DocumentInput, OperationResult } from "@urql/core";

let API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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

const queryAPI = async <Query, Variables extends AnyVariables = AnyVariables>({
  query,
  variables,
  previewToken,
}: {
  query: DocumentInput<Query, Variables>;
  variables: Variables;
  previewToken?: string;
}): Promise<OperationResult<Query, Variables>> => {
  const params = new URLSearchParams({});

  if (previewToken) {
    params.append("token", previewToken);
  }

  const makeClient = () => {
    return createClient({
      url: `${API_URL}?${params.toString()}`,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => {
        return {
          next: {
            revalidate: previewToken ? 0 : undefined,
          },
        };
      },
    });
  };

  const { getClient } = registerUrql(makeClient);

  console.info("urql query");

  return await getClient()
    .query(query, variables)
    .toPromise()
    .then((result) => {
      // https://formidable.com/open-source/urql/docs/basics/errors/
      if (result.error) {
        console.warn(result.error.message);

        // TODO: refresh token & rerun request if expired token error
        if (result.error.networkError) {
          process.exitCode = 1;
        }
      }

      return result;
    });
};

export default queryAPI;
