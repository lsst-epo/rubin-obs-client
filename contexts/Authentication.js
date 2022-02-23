import { createContext, useContext } from "react";

const AuthenticationContext = createContext(null);

export default AuthenticationContext;

export function useAuhtenticationContext() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      `Authentication components cannot be rendered outside the Authentication.Provider component.`
    );
  }
  return context;
}
