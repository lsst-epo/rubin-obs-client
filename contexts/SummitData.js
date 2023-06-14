import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import getEfd from "@/lib/api/efd";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
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
