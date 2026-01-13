import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useSummitDataQuery } from "@/lib/api/summitData";
import useAstroweather from "@/lib/api/astroweather";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const {
    data: astroweatherData = {},
    isLoading: astroweatherIsLoading,
    isError: astroweatherIsError,
  } = useAstroweather();
  const { data, isLoading, isError } = useSummitDataQuery();
  let summitData = {};
  let summitMedia = { items: {} };

  if (data) {
    summitMedia = {
      items: {
        allSkyImage: data.allSkyImage,
        allSkyVideo: data.allSkyVideo,
      },
    };

    summitData = {
      current: data.summitCurrentData.current,
      daily: data.summitDailyData.daily,
      hourly: data.summitHourlyData.hourly,
      domeStatus: data.nightlyDigest.nightlyDigest.domeStatus,
      exposureCount: data.nightlyDigest.nightlyDigest.exposureCount,
      surveyProgress: data.nightlyDigest.nightlyDigest.surveyProgress,
    };
    if (summitData.current.dewPoint === null) {
      summitData.current.dewPoint = 1.0; // temporary code just for demoing/unblocking us
    }
  }
  const dateTime = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Santiago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );

  const time = `${dateTime.hour}:${dateTime.minute} hrs`;
  const date = `${dateTime.year}-${dateTime.month}-${dateTime.day}`;

  const localeContextInfo = {
    time,
    date,
    location: "Chile",
  };

  const value = useMemo(
    () => ({
      summitData,
      summitMedia,
      astroweatherData,
      error: { hasura: isError, astroweather: astroweatherIsError },
      isLoading: {
        hasura: isLoading,
        astroweather: astroweatherIsLoading,
      },
      localeContextInfo: {
        time,
        date,
        location: "Chile",
      },
    }),
    [
      summitData,
      summitMedia,
      astroweatherData,
      isLoading,
      isError,
      astroweatherIsLoading,
      astroweatherIsError,
      localeContextInfo,
    ]
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

SummitDataProvider.propTypes = { children: PropTypes.node };

export const useSummitData = () => useContext(SummitDataContext);
