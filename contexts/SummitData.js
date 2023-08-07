import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useEfd from "@/lib/api/efd";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  // const {
  //   data: currentData,
  //   isLoading: currentIsLoading,
  //   isError: currentIsError,
  // } = useEfd("current");
  // const {
  //   data: hourlyData,
  //   isLoading: hourlyIsLoading,
  //   isError: hourlyIsError,
  // } = useEfd("hourly");
  // const {
  //   data: dailyData,
  //   isLoading: dailyIsLoading,
  //   isError: dailyIsError,
  // } = useEfd("daily");

  const { data = {}, isLoading = true, isError = false } = useEfd();

  const value = useMemo(
    () => ({
      data,
      isLoading,
      isError,
    }),
    [data, isLoading, isError]
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

SummitDataProvider.propTypes = { children: PropTypes.node };

export const useSummitData = () => useContext(SummitDataContext);
