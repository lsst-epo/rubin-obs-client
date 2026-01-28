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
    allSkyVideo {
      timeCreated
      updated
      mediaLink
      bucket
      name
    }
    nightlyDigest {
      nightlyDigest {
        alertCount: alert_count
        exposureCount: exposure_count
        domeStatus: dome_open
        surveyProgress: survey_progress
      }
    }
    weatherData: currentWeatherRedisData {
      rawCurrentWeather {
        data_current {
          pictocode_detailed
        }
      }
    }
    summitCurrentData: summitDataCurrent {
      current {
        dewPoint: dewPointItem
        pressure0: pressureItem0
        relativeHumidity: relativeHumidityItem
        temperature0: temperatureItem0
        windDirection
        windspeed
      }
    }
    summitDailyData: summitDataDaily {
      daily {
        _time
        temperature0_max: temperatureItem0_max
        temperature0_min: temperatureItem0_min
      }
    }
    summitHourlyData: summitDataHourly {
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
