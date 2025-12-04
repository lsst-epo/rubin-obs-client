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
    };
    if (summitData.current.dewPoint === null) {
      summitData.current.dewPoint = 1.0; // temporary code just for demoing/unblocking us
    }
  }
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
    }),
    [
      summitData,
      summitMedia,
      astroweatherData,
      isLoading,
      isError,
      astroweatherIsLoading,
      astroweatherIsError,
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
