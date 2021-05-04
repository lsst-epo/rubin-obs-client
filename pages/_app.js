import PropTypes from "prop-types";
import "@/lib/i18n";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";
import "focus-visible";

function Client({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

Client.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default Client;
