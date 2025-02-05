"use client";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const NestedContext = createContext(false);

export const NestedProvider = ({ children, value }) => {
  return (
    <NestedContext.Provider value={value}>{children}</NestedContext.Provider>
  );
};

export function useNestedContext() {
  return useContext(NestedContext);
}

NestedProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.bool,
};

export default NestedContext;
