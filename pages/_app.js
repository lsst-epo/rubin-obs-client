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

function Client({ Component, pageProps }) {
  const authData = useAuthentication({
    typeHandle: pageProps?.data?.typeHandle || "",
    language: pageProps?.data?.language || "en-US",
    localized: pageProps?.data?.localized || [],
  });

  return (
    <UIDReset>
      <AuthenticationContextProvider data={authData}>
        <Script
          id="page-proofer-snippet"
          src="https://app.pageproofer.com/embed/77e83361-ba26-51f2-978b-850fb00a263e"
          strategy="lazyOnload"
        />
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
