import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGoogleLogin } from "react-google-login";
import {
  authenticate,
  registerTeacher,
  registerStudent,
  forgottenPassword,
  refreshJWT,
  authenticateGoogle,
  authenticateFacebook,
  getFacebookOauthUrl,
} from "@/lib/api/auth";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;
const SESSION_STORAGE_KEYS = [
  "jwt",
  "jwtExpiresAt",
  "refreshToken",
  "refreshTokenExpiresAt",
  "pendingRole",
];

function getTokensFromStorage() {
  const tokens = {};
  SESSION_STORAGE_KEYS.forEach(
    (key) => (tokens[key] = sessionStorage.getItem(key))
  );
  return tokens;
}

function storeTokens(tokens) {
  Object.keys(tokens)
    .filter(Boolean)
    .forEach((key) => sessionStorage.setItem(key, tokens[key]));
}

function unstoreTokens() {
  SESSION_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));
}

// TODO: store refresh token in cookie so token can be refreshed after browser session ends
export default function useAuthentication() {
  const { query } = useRouter();

  const [token, setToken] = useState(null);
  const [pendingRole, setPendingRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { signIn: goToGoogleSignIn } = useGoogleLogin({
    clientId: GOOGLE_APP_ID,
    onSuccess: (response) =>
      authenticateWithGoogle({ idToken: response.tokenId }),
    onFailure: (error) => console.error(error),
  });

  useEffect(() => {
    if (typeof window === "undefined") return null;

    const { jwt, pendingRole } = getTokensFromStorage();

    if (pendingRole) {
      setPendingRole();
    }
    if (jwt) {
      setToken(jwt);
    }
  }, []);

  useEffect(() => {
    // TODO: cancel promise if component unmounts first
    (async () => await maybeRefreshToken())();
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  useEffect(() => {
    if (!query.code || !query.facebook) return;

    (async () => await authenticateWithFacebook({ code: query.code }))();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  function clearState() {
    setToken(null);
    setLoading(false);
    setError(false);
    unstoreTokens();
  }

  function handleSuccess(authData) {
    const { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt } = authData;

    setToken(jwt);
    setLoading(false);
    setError(false);
    storeTokens({
      jwt,
      jwtExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      pendingRole,
    });

    return authData;
  }

  function handleError(data) {
    setError(true);
    setLoading(false);
    return data;
  }

  /**
   * Returned from context so it can be run before making API requests
   * for protected data. This way, authenticated users whose JWT has expired
   * can get a refreshed token before fetching data.
   */
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

    const data = await refreshJWT({ refreshToken });

    return data?.refreshToken
      ? handleSuccess(data.refreshToken)
      : handleError(data);
  }

  async function signIn({ email, password }) {
    setLoading(true);

    const data = await authenticate({ email, password, token });

    return data?.authenticate
      ? handleSuccess(data.authenticate)
      : handleError(data);
  }

  function signOut() {
    setToken(null);
  }

  async function register({ email, password, fullName }) {
    if (!fullName) return;

    setLoading(true);

    const name = fullName.split(" ");
    const firstName = name[0];
    const lastName =
      name.length > 1 ? fullName.slice(firstName.length + 1) : "";

    const registerMethod =
      pendingRole === "teacher" ? registerTeacher : registerStudent;

    const data = await registerMethod({
      email,
      password,
      firstName,
      lastName,
      token,
    });

    const returnRole =
      pendingRole === "teacher" ? "registerTeachers" : "registerStudents";

    return data?.[returnRole]
      ? handleSuccess(data[returnRole])
      : handleError(data);
  }

  async function forgotPassword({ email }) {
    setLoading(true);

    const data = await forgottenPassword({ email, token });

    return data?.forgottenPassword
      ? handleSuccess(data.forgottenPassword)
      : handleError(data);
  }

  /**
   * Gets the google user's auth token and signs in using the auth plugin
   * @param idToken: The auth code returned by Google after a sucessful sign in
   */
  async function authenticateWithGoogle({ idToken }) {
    setLoading(true);

    const data = await authenticateGoogle({
      idToken,
      role: pendingRole,
    });

    const returnRole =
      pendingRole === "teacher"
        ? "googleSignInTeachers"
        : "googleSignInStudents";

    return data?.[returnRole]
      ? handleSuccess(data[returnRole])
      : handleError(data);
  }

  /**
   * 1. Get the FB sign-in URL from Craft
   * 2. Redirect to FB sign-in
   * 3. After user is authenticated by FB, they will be redirected back
   *    to this site with a `code` URL param.
   * 4. An effect above watches for changes to URL params and
   *    executes `authenticateWithFacebook` when `code` and `facebook` params are present
   */
  async function goToFacebookSignIn() {
    setLoading(true);

    const data = await getFacebookOauthUrl();

    if (data?.facebookOauthUrl) {
      setLoading(false);
      window.open(data.facebookOauthUrl, "_self");
    } else {
      handleError(data);
    }
  }

  async function authenticateWithFacebook({ code }) {
    setLoading(true);

    const data = await authenticateFacebook({ code, role: pendingRole });

    const returnRole =
      pendingRole === "teacher"
        ? "facebookSignInTeachers"
        : "facebookSignInStudents";

    return data?.[returnRole]
      ? handleSuccess(data[returnRole])
      : handleError(data);
  }

  return {
    isAuthenticated: !!token,
    pendingRole,
    loading,
    error,
    setPendingRole,
    maybeRefreshToken,
    signIn,
    signOut,
    register,
    forgotPassword,
    goToGoogleSignIn,
    goToFacebookSignIn,
  };
}
