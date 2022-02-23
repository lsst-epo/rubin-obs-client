/* eslint-disable unused-imports/no-unused-imports */

import PropTypes from "prop-types";
import "@/lib/i18n";
import "focus-visible";
import { UIDReset } from "react-uid";
import AuthenticationContext from "@/contexts/Authentication";
import useAuthentication from "@/hooks/useAuthentication";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";

function Client({ Component, pageProps }) {
  const value = useAuthentication();

  return (
    <UIDReset>
      <AuthenticationContext.Provider value={value}>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthenticationContext.Provider>
    </UIDReset>
  );
}

Client.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default Client;

/* eslint-enable unused-imports/no-unused-imports */
