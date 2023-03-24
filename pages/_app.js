/* eslint-disable unused-imports/no-unused-imports */

import PropTypes from "prop-types";
import "@/lib/i18n";
import "focus-visible";
import { UIDReset } from "react-uid";
import Script from "next/script";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import useAuthentication from "@/hooks/useAuthentication";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";
import { useEffect } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PAGEPROOFER_ID = process.env.NEXT_PUBLIC_PAGEPROOFER_ID;
const LEVELACCESS_ID = process.env.NEXT_PUBLIC_LEVELACCESS_ID;

function Client({ Component, pageProps }) {
  const authData = useAuthentication({
    typeHandle: pageProps?.data?.typeHandle || "",
    language: pageProps?.data?.language || "en-US",
    localized: pageProps?.data?.localized || [],
  });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
  }, []);

  return (
    <UIDReset>
      <AuthenticationContextProvider data={authData}>
        {PLAUSIBLE_DOMAIN && (
          <Script
            id="plausible-script"
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/plausible.js"
            strategy="afterInteractive"
          />
        )}
        {PAGEPROOFER_ID && (
          <Script
            id="page-proofer-snippet"
            src={`https://app.pageproofer.com/embed/${PAGEPROOFER_ID}`}
            strategy="lazyOnload"
          />
        )}
        {LEVELACCESS_ID && (
          <Script
            id="level-access-snippet"
            src={`https://cdn.levelaccess.net/accessjs/${LEVELACCESS_ID}/access.js`}
            strategy="lazyOnload"
          />
        )}
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthenticationContextProvider>
    </UIDReset>
  );
}

Client.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default Client;

/* eslint-enable unused-imports/no-unused-imports */
