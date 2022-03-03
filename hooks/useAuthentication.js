import { useState, useEffect } from "react";
import {
  authenticate,
  registerTeacher,
  registerStudent,
  forgottenPassword,
  refreshJWT,
} from "@/lib/api/auth";

const SESSION_STORAGE_KEYS = [
  "jwt",
  "jwtExpiresAt",
  "refreshToken",
  "refreshTokenExpiresAt",
];

// TODO: store refresh token in cookie so token can be refreshed after browser session ends
export default function useAuthentication() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // TODO: cancel promise if component unmounts first
    (async () => await maybeRefreshToken())();
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  function getTokensFromStorage() {
    const tokens = {};
    SESSION_STORAGE_KEYS.forEach(
      (key) => (tokens[key] = sessionStorage.getItem(key))
    );
    return tokens;
  }

  function storeTokens(tokens) {
    Object.keys(tokens).forEach((key) =>
      sessionStorage.setItem(key, tokens[key])
    );
  }

  function unstoreTokens() {
    SESSION_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));
  }

  function setStateFromResponse(authData) {
    const { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt } = authData;

    setToken(jwt);
    storeTokens({ jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt });
  }

  function clearState() {
    setToken(null);
    unstoreTokens();
  }

  // Returned from context so it can be run before making API requests for protected data.
  // This way, authenticated users whose JWT has expired can get a refreshed token before fetching data.
  async function maybeRefreshToken() {
    if (typeof window === "undefined") return null;

    const { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt } =
      getTokensFromStorage();

    // if tokens aren't in storage, we can't refresh
    if (!jwt || !jwtExpiresAt || !refreshToken || !refreshTokenExpiresAt)
      return null;

    // if stored refresh token has expired, clear hook state and storage
    if (Date.now() > refreshTokenExpiresAt) {
      clearState();
      return null;
    }

    // if current JWT hasn't expired, set in state to keep using and return current refresh token
    if (Date.now() < jwtExpiresAt) {
      setToken(jwt);
      return refreshToken;
    }

    // before fetching, optimistically assume user is logged in
    // so UI doesn't show logged-out state while awaiting response
    setToken(jwt);

    const data = await refreshJWT({ refreshToken });

    if (data?.refreshToken) {
      setStateFromResponse(data.refreshToken);
      return data.refreshToken.jwt;
    } else {
      clearState();
      return null;
    }
  }

  async function signIn({ email, password }) {
    const data = await authenticate({ email, password, token });

    if (data?.authenticate) {
      setStateFromResponse(data.authenticate);
    }

    return data;
  }

  function signOut() {
    setToken(null);
  }

  async function register({ email, password, fullName, role }) {
    const registerMethod =
      role === "teacher" ? registerTeacher : registerStudent;

    if (!fullName) return;

    const name = fullName.split(" ");
    const firstName = name[0];
    const lastName =
      name.length > 1 ? fullName.slice(firstName.length + 1) : "";

    const data = await registerMethod({
      email,
      password,
      firstName,
      lastName,
      token,
    });

    const returnRole =
      role === "teacher" ? "registerTeachers" : "registerStudents";

    if (data?.[returnRole]) {
      setStateFromResponse(data[returnRole]);

      return data[returnRole];
    } else {
      return data;
    }
  }

  async function forgotPassword({ email }) {
    const data = await forgottenPassword({ email, token });

    if (data?.forgottenPassword) {
      return data.forgottenPassword;
    } else {
      return data;
    }
  }

  return {
    isAuthenticated: !!token,
    maybeRefreshToken,
    signIn,
    signOut,
    register,
    forgotPassword,
  };
}
