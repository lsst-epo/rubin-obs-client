import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import jwtDecode from "jwt-decode";
import {
  authenticate,
  registerEducator,
  registerStudent,
  forgottenPassword,
  setNewPassword,
  activate,
  refreshJWT,
  authenticateGoogle,
  authenticateFacebook,
  getFacebookOauthUrl,
  fetchUser,
  requestDeletion,
} from "@/lib/api/auth";
import useQueryParams from "@/lib/routing/useQueryParams";

const SESSION_STORAGE_KEYS = [
  "jwt",
  "jwtExpiresAt",
  "refreshToken",
  "refreshTokenExpiresAt",
  "status",
  "pendingDeletion",
  "hasActivated",
];
const CRAFT_HOMEPAGE_URI = "__home__";

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

function hasPendingDeletion(userData) {
  return userData?.requestDeletion?.[0] === "requested";
}

// TODO: store refresh token in cookie so token can be refreshed after browser session ends
export default function useAuthentication() {
  const { queryParams } = useQueryParams();
  const pathName = usePathname();

  const [token, setToken] = useState(getTokenFromStorage("jwt"));
  const [user, setUser] = useState(getUserFromJwt());
  const [status, setStatus] = useState(getTokenFromStorage("status"));
  const [pendingDeletion, setPendingDeletion] = useState(
    getTokenFromStorage("pendingDeletion") === "true"
  );
  const [pendingGroup, setPendingGroup] = useState(
    getTokenFromStorage("pendingGroup") || "educators"
  );
  // user has completed activation process (but may still have a `pending`
  // status if they haven't logged in post-activation yet)
  const [hasActivated, setHasActivated] = useState(
    getTokenFromStorage("hasActivated") === "true"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    if (!queryParams.get("code") || !queryParams.get("facebook")) return;
    (async () =>
      await authenticateWithFacebook({ code: queryParams.get("code") }))();
  }, [queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

  function clearState() {
    setToken(null);
    setUser(null);
    setStatus(null);
    setPendingDeletion(false);
    setPendingGroup("educators");
    setHasActivated(false);
    setLoading(false);
    setError(false);
    unstoreTokens();
  }

  function handleSuccess(authData) {
    setLoading(false);
    setError(false);

    const {
      jwt,
      jwtExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      user,
      hasActivated,
    } = authData;

    if (jwt) {
      setToken(jwt);
      setStatus(user?.status);
      setPendingDeletion(hasPendingDeletion(user));
      setUserFromJwt(jwt);
      storeTokens({
        jwt,
        jwtExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
        status: user?.status,
        pendingDeletion: hasPendingDeletion(user),
      });
    }

    if (hasActivated) {
      setHasActivated(true);
      storeTokens({
        hasActivated,
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

    // if current JWT hasn't expired, set in state to keep using and return current token data
    if (Date.now() < jwtExpiresAt) {
      setToken(jwt);
      setUserFromJwt(jwt);
      return { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt };
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

    if (!data?.authenticate) return handleError(data);

    return handleSuccess(data.authenticate);
  }

  function signOut() {
    clearState();
  }

  async function register({ email, password, firstName, lastName }) {
    setLoading(true);
    setError(false);

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

  async function setPassword({ password, code, id }) {
    setLoading(true);
    setError(false);

    const data = await setNewPassword({ password, code, id });

    return data?.setPassword
      ? handleSuccess(data.setPassword)
      : handleError(data);
  }

  async function activateUser({ code, id }) {
    setLoading(true);
    setError(false);

    const data = await activate({ code, id });

    return data?.activateUser
      ? handleSuccess({ hasActivated: true })
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

    if (!data?.[returnRole]) return handleError(data);

    return handleSuccess(data[returnRole]);
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
      const facebookOauthUrl = data.facebookOauthUrl;
      const state = pathName;
      const startSplitter = "&state=";
      const endSplitter = "&response_type";
      const startOfFacebookOauthUrl = facebookOauthUrl.split(startSplitter)[0];
      const endOfFacebookOauthUrl = facebookOauthUrl.split(endSplitter).pop();
      const reAssembledFacebookOauthUrl = [
        startOfFacebookOauthUrl,
        startSplitter,
        state,
        endSplitter,
        endOfFacebookOauthUrl,
      ].join("");
      window.open(reAssembledFacebookOauthUrl, "_self");
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

    if (!data?.[returnRole]) return handleError(data);

    return handleSuccess(data[returnRole]);
  }

  async function fetchUserData() {
    const freshTokenData = await maybeRefreshToken();

    if (!freshTokenData?.jwt)
      return { error: true, errorType: "session_expired" };

    const data = await fetchUser(freshTokenData.jwt);

    if (!data?.viewer) return { error: true, errorType: "generic", data };

    setStatus(data.viewer.status);
    setPendingDeletion(hasPendingDeletion(data.viewer));
    storeTokens({
      status: data.viewer.status,
      pendingDeletion: hasPendingDeletion(data.updateViewer),
    });

    return data;
  }

  async function requestAccountDeletion() {
    const data = await requestDeletion(token);

    if (!data?.updateViewer) return data;

    setPendingDeletion(hasPendingDeletion(data.updateViewer));
    storeTokens({
      pendingDeletion: hasPendingDeletion(data.updateViewer),
    });

    return data;
  }

  return {
    isAuthenticated: !!token,
    user,
    status,
    pendingDeletion,
    pendingGroup,
    hasActivated,
    loading,
    error,
    setPendingGroup,
    maybeRefreshToken,
    signIn,
    signOut,
    register,
    forgotPassword,
    setPassword,
    activateUser,
    goToFacebookSignIn,
    authenticateWithGoogle,
    fetchUserData,
    requestAccountDeletion,
  };
}
