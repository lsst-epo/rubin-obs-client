import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useReducer,
} from "react";
import {
  currentWeather,
  dailyWeather,
  hourlyWeather,
} from "@/lib/api/queries/weather";
import PropTypes from "prop-types";
import queryEfd from "@/lib/api/efd";

export const SummitDataContext = createContext({});

const loadingReducer = (state, action) => {
  const { type, dataSet } = action;

  switch (type) {
    case "complete":
      return { ...state, [dataSet]: false };
    case "loading":
      return { ...state, [dataSet]: true };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const defaultLoadState = {
  currentData: true,
  hourlyData: true,
  dailyData: true,
};

export const SummitDataProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState();
  const [hourlyData, setHourlyData] = useState();
  const [dailyData, setDailyData] = useState();
  const [error, setError] = useState(false);
  const [loading, dispatch] = useReducer(loadingReducer, defaultLoadState);

  const fetchCurrentWeather = () =>
    new Promise((resolve, reject) => {
      queryEfd(currentWeather)
        .then((value) => {
          setCurrentData(...value);
          resolve(...value);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          dispatch({ type: "complete", dataSet: "currentData" });
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
        })
        .finally(() => {
          dispatch({ type: "complete", dataSet: "hourlyData" });
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
        })
        .finally(() => {
          dispatch({ type: "complete", dataSet: "dailyData" });
        });
    });

  useEffect(() => {
    Promise.allSettled([
      fetchCurrentWeather(),
      fetchHourlyWeather(),
      fetchDailyWeather(),
    ]).catch((e) => {
      console.error(e);
      setError(true);
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
