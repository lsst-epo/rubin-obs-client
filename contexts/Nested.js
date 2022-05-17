import { createContext, useContext } from "react";

const NestedContext = createContext(false);

export function useNestedContext() {
  return useContext(NestedContext);
}

export default NestedContext;
