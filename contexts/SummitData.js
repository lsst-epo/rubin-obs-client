import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  currentWeather,
  dailyWeather,
  hourlyWeather,
} from "@/lib/api/queries/weather";
import PropTypes from "prop-types";
import queryEfd from "@/lib/api/efd";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState();
  const [hourlyData, setHourlyData] = useState();
  const [dailyData, setDailyData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCurrentWeather = () =>
    new Promise((resolve, reject) => {
      queryEfd(currentWeather)
        .then((value) => {
          setCurrentData(...value);
          resolve(...value);
        })
        .catch((e) => {
          reject(e);
        });
    });

  const fetchHourlyWeather = () =>
    new Promise((resolve, reject) => {
      queryEfd(hourlyWeather)
        .then((value) => {
          setHourlyData(value);
          resolve(value);
        })
        .catch((e) => {
          reject(e);
        });
    });

  const fetchDailyWeather = () =>
    new Promise((resolve, reject) => {
      queryEfd(dailyWeather)
        .then((value) => {
          setDailyData(value);
          resolve(value);
        })
        .catch((e) => {
          reject(e);
        });
    });

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      fetchCurrentWeather(),
      fetchHourlyWeather(),
      fetchDailyWeather(),
    ])
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      currentData,
      hourlyData,
      dailyData,
      loading,
      error,
    }),
    [currentData, hourlyData, dailyData, loading, error]
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

SummitDataProvider.propTypes = { children: PropTypes.node };

export const useSummitData = () => useContext(SummitDataContext);
