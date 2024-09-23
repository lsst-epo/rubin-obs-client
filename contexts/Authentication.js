"use client";
import { createContext, useContext } from "react";
import useAuthentication from "@/hooks/useAuthentication";

const AuthenticationContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthenticationContextProvider({ children }) {
  const authData = useAuthentication();
  return (
    <AuthenticationContext.Provider value={authData}>
      {children}
    </AuthenticationContext.Provider>
  );
}

AuthenticationContextProvider.displayName = "AuthenticationContext.Provider";

export function useAuthenticationContext() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      `Authentication components cannot be rendered outside the Authentication.Provider component.`
    );
  }
  return context;
}

export default AuthenticationContext;
