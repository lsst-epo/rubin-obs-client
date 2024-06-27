import { createContext, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { normalizePathData } from "@/lib/utils";
import { useRouter } from "next/router";

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
  const { asPath, query, push } = useRouter();
  delete query.uriSegments;

  const { pathname, pathParams } = normalizePathData(asPath);

  const setParams = useCallback(
    (params = {}) => {
      push({
        pathname,
        query: { ...pathParams, ...params },
      });
    },
    [pathname, pathParams, push]
  );

  const resetParams = useCallback(() => {
    push(pathname);
  }, [pathname, push]);

  const activeServerParams = Object.keys(serverParams).reduce((prev, key) => {
    if (isParamDefined(serverParams[key])) {
      prev[key] = serverParams[key];
    }

    return prev;
  }, {});

  return (
    <FilterParamsContext.Provider
      value={{
        params: { ...pathParams, ...activeServerParams },
        hidden: Object.keys(serverParams).filter(
          (key) => serverParams[key] && serverParams[key].length > 0
        ),
        setParams,
        resetParams,
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
  const { query } = useRouter();

  if (!context) {
    return { params: query };
  }

  return context;
};
