/* eslint-disable unused-imports/no-unused-imports */

import PropTypes from "prop-types";
import "@/lib/i18n";
import "focus-visible";
import { UIDReset } from "react-uid";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import useAuthentication from "@/hooks/useAuthentication";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";

function Client({ Component, pageProps }) {
  const authData = useAuthentication();

  return (
    <UIDReset>
      <AuthenticationContextProvider data={authData}>
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
