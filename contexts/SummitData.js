import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { currentWeather, dailyWeather } from "@/lib/api/queries/weather";
import PropTypes from "prop-types";
import queryEfd from "@/lib/api/efd";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Promise.all(queryEfd(currentWeather), queryEfd(dailyWeather))
    queryEfd(dailyWeather)
      .then((value) => {
        console.log({ value });
        setData(value);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
    }),
    [data, loading, error]
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

SummitDataProvider.propTypes = { children: PropTypes.node };

export const useSummitData = () => useContext(SummitDataContext);
