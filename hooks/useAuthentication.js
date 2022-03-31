import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGoogleLogin } from "react-google-login";
import jwtDecode from "jwt-decode";
import {
  authenticate,
  registerEducator,
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
  "status",
];

function getTokenFromStorage(key) {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key);
}

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
export default function useAuthentication({ typeHandle = "" }) {
  const { query, push } = useRouter();

  const [token, setToken] = useState(getTokenFromStorage("jwt"));
  const [user, setUser] = useState(getUserFromJwt());
  const [status, setStatus] = useState(getTokenFromStorage("status"));
  const [pendingGroup, setPendingGroup] = useState(
    getTokenFromStorage("pendingGroup") || "students"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { signIn: goToGoogleSignIn } = useGoogleLogin({
    clientId: GOOGLE_APP_ID,
    onSuccess: (response) => {
      const ssoModalUrl = { pathname: "/", query: { sso: true } };
      push(ssoModalUrl, undefined, {
        shallow: true,
      });
      authenticateWithGoogle({ idToken: response.tokenId });
    },
    onFailure: (error) => console.error(error),
  });

  useEffect(() => {
    // TODO: cancel promise if component unmounts first
    (async () => await maybeRefreshToken())();
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  useEffect(() => {
    // Store pendingGroup to persist value during SSO redirect
    const storedGroup = sessionStorage.getItem("pendingGroup");

    if (storedGroup !== pendingGroup) {
      sessionStorage.setItem("pendingGroup", pendingGroup);
    }
  }, [pendingGroup]);

  useEffect(() => {
    if (!query.code || !query.facebook) return;

    (async () => await authenticateWithFacebook({ code: query.code }))();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  function clearState() {
    setToken(null);
    setUser(null);
    setStatus(null);
    setLoading(false);
    setError(false);
    unstoreTokens();
  }

  function handleSuccess(authData) {
    setLoading(false);
    setError(false);

    const { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt, user } =
      authData;

    if (jwt) {
      setToken(jwt);
      setStatus(user?.status);
      setUserFromJwt(jwt);
      storeTokens({
        jwt,
        jwtExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
        status: user?.status,
      });
    }

    return authData;
  }

  function handleError(data) {
    setError(true);
    setLoading(false);
    return data;
  }

  function getUserFromJwt(jwt = getTokenFromStorage("jwt")) {
    if (!jwt) return;

    const { email, groups, fullName } = jwtDecode(jwt);
    const group = groups?.length ? groups[0].toLowerCase() : null;
    return {
      email,
      fullName,
      group,
    };
  }

  function setUserFromJwt(jwt) {
    const user = getUserFromJwt(jwt);

    setUser(user);
  }

  /**
   * Returned from hook so it can be run before making API requests
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
      setUserFromJwt(jwt);
      return refreshToken;
    }

    const data = await refreshJWT({ refreshToken });

    return data?.refreshToken
      ? handleSuccess(data.refreshToken)
      : handleError(data);
  }

  async function signIn({ email, password }) {
    setLoading(true);
    setError(false);

    const data = await authenticate({ email, password, token });

    return data?.authenticate
      ? handleSuccess(data.authenticate)
      : handleError(data);
  }

  function signOut() {
    clearState();

    if (typeHandle === "educatorPages") {
      push("/");
    }
  }

  async function register({ email, password, fullName }) {
    if (!fullName) return;

    setLoading(true);
    setError(false);

    const name = fullName.split(" ");
    const firstName = name[0];
    const lastName =
      name.length > 1 ? fullName.slice(firstName.length + 1) : "";

    const registerMethod =
      pendingGroup === "educators" ? registerEducator : registerStudent;

    const data = await registerMethod({
      email,
      password,
      firstName,
      lastName,
      token,
    });

    const returnRole =
      pendingGroup === "educators" ? "registerEducators" : "registerStudents";

    return data?.[returnRole]
      ? handleSuccess(data[returnRole])
      : handleError(data);
  }

  async function forgotPassword({ email }) {
    setLoading(true);
    setError(false);

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
    setError(false);

    const data = await authenticateGoogle({
      idToken,
      pendingGroup,
    });

    const returnRole =
      pendingGroup === "educators"
        ? "googleSignInEducators"
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
    setError(false);

    const data = await getFacebookOauthUrl();

    if (data?.facebookOauthUrl) {
      window.open(data.facebookOauthUrl, "_self");
    } else {
      handleError(data);
    }
  }

  async function authenticateWithFacebook({ code }) {
    setLoading(true);
    setError(false);

    const data = await authenticateFacebook({ code, pendingGroup });

    const returnRole =
      pendingGroup === "educators"
        ? "facebookSignInEducators"
        : "facebookSignInStudents";

    return data?.[returnRole]
      ? handleSuccess(data[returnRole])
      : handleError(data);
  }

  return {
    isAuthenticated: !!token,
    user,
    status,
    pendingGroup,
    loading,
    error,
    setPendingGroup,
    maybeRefreshToken,
    signIn,
    signOut,
    register,
    forgotPassword,
    goToGoogleSignIn,
    goToFacebookSignIn,
    typeHandle,
  };
}
