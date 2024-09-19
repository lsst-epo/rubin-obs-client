import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useQueryParams from "@/lib/routing/useQueryParams";

const isParamDefined = (filterValue) => {
  if (Array.isArray(filterValue)) {
    return filterValue.length > 0;
  }

  if (typeof filterValue === "string") {
    return filterValue.length > 0;
  }

  return typeof filterValue !== "undefined" && filterValue !== null;
};

const FilterParamsContext = createContext(null);

/** Provider for managing dynamic page filters either
 * through the router or internal state. In some cases, like
 * setting up a specific filtered view, it may be preferred to
 * hide which filters are applied from the URL.
 */
export const FilterParamsProvider = ({ children, serverParams = {} }) => {
  const { queryParams, setQueryParams, clearQueryParams } = useQueryParams();

  const activeServerParams = Object.keys(serverParams).reduce((prev, key) => {
    if (isParamDefined(serverParams[key])) {
      prev[key] = serverParams[key];
    }

    return prev;
  }, {});

  return (
    <FilterParamsContext.Provider
      value={{
        params: { ...Object.fromEntries(queryParams), ...activeServerParams },
        hidden: Object.keys(serverParams).filter(
          (key) => serverParams[key] && serverParams[key].length > 0
        ),
        setParams: (params) => setQueryParams(params, true),
        resetParams: () => clearQueryParams(true),
      }}
    >
      {children}
    </FilterParamsContext.Provider>
  );
};

FilterParamsProvider.propTypes = {
  children: PropTypes.node,
  serverParams: PropTypes.shape({
    filter: PropTypes.arrayOf(PropTypes.string),
    page: PropTypes.number,
    search: PropTypes.string,
    sort: PropTypes.string,
    type: PropTypes.string,
  }),
};

export const useFilterParams = () => {
  const context = useContext(FilterParamsContext);
  const { queryParams } = useQueryParams();

  if (!context) {
    return { params: queryParams };
  }

  return context;
};
