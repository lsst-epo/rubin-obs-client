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

// const PAGEPROOFER_ID = process.env.NEXT_PUBLIC_PAGEPROOFER_ID;
// Should be replaced with an env var
const PAGEPROOFER_ID = "0a40ceaf-340d-5e6a-adc7-898f09823859";
// const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
// Should be replaced with an env var
const PLAUSIBLE_DOMAIN = "rubinobs.com";

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
          id="plausible-script"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
        <Script
          id="page-proofer-snippet"
          src={`https://app.pageproofer.com/embed/${PAGEPROOFER_ID}`}
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
