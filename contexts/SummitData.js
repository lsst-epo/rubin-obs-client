<<<<<<< HEAD
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  currentWeather,
  dailyWeather,
  hourlyWeather,
} from "@/lib/api/queries/weather";
import PropTypes from "prop-types";
import queryEfd from "@/lib/api/efd";
=======
import getEfd from "@/lib/api/efd";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
>>>>>>> ebb054c ([F] SummitData provider)

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEfd()
      .then((value) => {
        setData(value);
      })
      .catch(() => {
>>>>>>> ebb054c ([F] SummitData provider)
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
<<<<<<< HEAD
      currentData,
      hourlyData,
      dailyData,
      loading,
      error,
    }),
    [currentData, hourlyData, dailyData, loading, error]
=======
      data,
      loading,
      error,
    }),
    [data, loading, error]
>>>>>>> ebb054c ([F] SummitData provider)
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

<<<<<<< HEAD
SummitDataProvider.propTypes = { children: PropTypes.node };

=======
>>>>>>> ebb054c ([F] SummitData provider)
export const useSummitData = () => useContext(SummitDataContext);
