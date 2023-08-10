import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useEfd from "@/lib/api/efd";
import useAstroweather from "@/lib/api/astroweather";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const {
    data: astroweatherData = {},
    isLoading: astroweatherIsLoading,
    isError: astroweatherIsError,
  } = useAstroweather();
  const { data = {}, isLoading, isError } = useEfd();

  const value = useMemo(
    () => ({
      data,
      astroweatherData,
      error: { efd: isError, astroweather: astroweatherIsError },
      isLoading: {
        efd: isLoading,
        astroweather: astroweatherIsLoading,
      },
    }),
    [
      data,
      isLoading,
      isError,
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
