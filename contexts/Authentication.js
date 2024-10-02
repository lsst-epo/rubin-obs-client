import { createContext, useContext } from "react";

const AuthenticationContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthenticationContextProvider({ data, children }) {
  return (
    <AuthenticationContext.Provider value={data}>
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
