"server-only";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { createClient, fetchExchange, cacheExchange } from "@urql/next";
import { registerUrql } from "@urql/next/rsc";
import { retryExchange } from "@urql/exchange-retry";
import type { AnyVariables, OperationResult } from "@urql/next";
import merge from "lodash/merge";
import previewSession from "@/services/sessions/preview";
import { API_URL, options, QueryAPI } from ".";

const queryAPI = async <Query, Variables extends AnyVariables = AnyVariables>({
  query,
  variables,
  fetchOptions: inputFetchOptions,
  previewToken,
}: QueryAPI<Query, Variables>): Promise<OperationResult<Query, Variables>> => {
  const token = previewToken || previewSession().token();
  const defaultFetchOptions: RequestInit = {
    cache: "force-cache",
    next: {
      revalidate: token ? 0 : undefined,
    },
  };
  const fetchOptions = merge({}, defaultFetchOptions, inputFetchOptions);

  if (inputFetchOptions?.next?.revalidate) {
    delete fetchOptions.cache;
  }

  const params = new URLSearchParams({});

  if (token) {
    params.append("token", token);
  }

  const makeClient = () => {
    return createClient({
      suspense: true,
      url: `${API_URL}?${params.toString()}`,
      exchanges: [cacheExchange, fetchExchange, retryExchange(options)],
      fetchOptions,
    });
  };

  const { getClient } = registerUrql(makeClient);

  return await getClient()
    .query(query, variables)
    .toPromise()
    .then((result) => {
      // https://formidable.com/open-source/urql/docs/basics/errors/
      if (result.error) {
        console.warn(result.error.message);

        // TODO: refresh token & rerun request if expired token error
        if (result.error.networkError) {
          process.exitCode = -99; // so we can confirm that the exit code as seen in ArgoCD is coming from this line
          console.info(result.error);
        } else if (result.error) {
          console.info("Some other error occurred!");
          console.info(result.error);
        }
      }

      return result;
    });
};

export default queryAPI;
