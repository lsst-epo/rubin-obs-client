// https://usehooks.com/
import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);

  const set = useCallback((newValue) => setState(newValue), []);

  return [state, toggle, set];
};

export default useToggle;
