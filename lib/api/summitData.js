import useSWR from "swr";
import { gql, GraphQLClient } from "graphql-request";
import { env } from "@/env";

export const hasuraQuery = gql`
  query SummitStatusData @cached(ttl: 300) {
    allSkyImage {
      timeCreated
      updated
      mediaLink
      bucket
      name
    }
    currentWidgetData {
      alert {
        count
      }
      dome {
        isOpen
      }
      exposure {
        count
      }
      survey {
        progress
      }
      weather {
        pictocode
      }
    }
  }
`;

async function gqlFetcher(key) {
  const headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": env.NEXT_PUBLIC_HASURA_SECRET,
  };
  const client = new GraphQLClient(env.NEXT_PUBLIC_HASURA_URL, { headers });
  return client
    .request(hasuraQuery)
    .then((data) => data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error in fetch.js :");
      console.warn(error);
      return error.response;
    });
}

export function useSummitDataQuery() {
  const { data, error } = useSWR("summitData", gqlFetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}
