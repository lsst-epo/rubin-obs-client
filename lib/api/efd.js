import useSWR from "swr";
import { GraphQLClient } from "graphql-request";

export const efdQuery = `
  query SummitStatusData @cached(ttl: 300) {
    summitMedia: summitItemsList {
      items {
        allSkyImage {
          timeCreated
          updated
          mediaLink
        }
        allSkyVideo{
          timeCreated
          updated
          mediaLink
        }
      }
    }
    summitData: summitCachedData {
      current {
        dewPoint: dewPointItem
        azimuth: mountAz
        zenith: mountEl
        pressure0: pressureItem0
        relativeHumidity: relativeHumidityItem
        temperature0: temperatureItem0
        windDirection
        windspeed
      }
      daily {
        _time
        temperature0_max: temperatureItem0_max
        temperature0_min: temperatureItem0_min
      }
      hourly {
        _time
        dewPoint_max: dewPointItem_max
        dewPoint_mean: dewPointItem_mean
        dewPoint_min: dewPointItem_min
        direction_max
        direction_mean
        direction_min
        pressure0_max: pressureItem0_max
        pressure0_mean: pressureItem0_mean
        pressure0_min: pressureItem0_min
        relativeHumidity_max: relativeHumidityItem_max
        relativeHumidity_mean: relativeHumidityItem_mean
        relativeHumidity_min: relativeHumidityItem_min
        speed_max
        speed_mean
        speed_min
        temperature0_max: temperatureItem0_max
        temperature0_mean: temperatureItem0_mean
        temperature0_min: temperatureItem0_min
      }
    }
  }
`;

async function gqlFetcher(query, variables = {}) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_EFD_URL);
  const headers = {
    "Content-Type": "application/json",
    "Hasura-Client-Name": "hasura-console",
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET,
    "x-hasura-access-key": process.env.NEXT_PUBLIC_HASURA_SECRET,
  };
  return client
    .request(query, variables, headers)
    .then((data) => data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error in fetch.js :");
      console.warn(error);
      return error.response;
    });
}

// const fetcher = (url) =>
//   fetch(url, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   }).then((res) => {
//     return res.json();
//   });

export function useEfd(query) {
  const { data, error } = useSWR([query, null, null, {}], gqlFetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
}
