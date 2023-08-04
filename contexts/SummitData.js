import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useEfd from "@/lib/api/efd";
import useAstroweather from "@/lib/api/astroweather";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const {
    data: astroweatherData,
    isLoading: astroweatherIsLoading,
    isError: astroweatherIsError,
  } = useAstroweather();
  const {
    data: currentData,
    isLoading: currentIsLoading,
    isError: currentIsError,
  } = useEfd("current");
  const {
    data: hourlyData,
    isLoading: hourlyIsLoading,
    isError: hourlyIsError,
  } = useEfd("hourly");
  const {
    data: dailyData,
    isLoading: dailyIsLoading,
    isError: dailyIsError,
  } = useEfd("daily");

  const value = useMemo(
    () => ({
      currentData,
      hourlyData,
      dailyData,
      astroweatherData,
      error:
        currentIsError || hourlyIsError || dailyIsError || astroweatherIsError,
      loading: {
        currentData: currentIsLoading,
        hourlyData: hourlyIsLoading,
        dailyData: dailyIsLoading,
        astroweatherData: astroweatherIsLoading,
      },
    }),
    [
      currentData,
      hourlyData,
      dailyData,
      currentIsLoading,
      hourlyIsLoading,
      dailyIsLoading,
      currentIsError,
      hourlyIsError,
      dailyIsError,
      astroweatherData,
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
