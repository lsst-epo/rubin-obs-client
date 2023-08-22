import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useEfd, efdQuery } from "@/lib/api/efd";
import useAstroweather from "@/lib/api/astroweather";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const {
    data: astroweatherData = {},
    isLoading: astroweatherIsLoading,
    isError: astroweatherIsError,
  } = useAstroweather();
  const { data, isLoading, isError } = useEfd(efdQuery);

  const { summitData, summitMedia } = data || {
    summitData: {},
    summitMedia: { items: {} },
  };
  //  || { summitData: {}, summitMedia: {} }
  const value = useMemo(
    () => ({
      summitData,
      summitMedia,
      astroweatherData,
      error: { efd: isError, astroweather: astroweatherIsError },
      isLoading: {
        efd: isLoading,
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
