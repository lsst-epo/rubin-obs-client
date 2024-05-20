/* eslint-disable unused-imports/no-unused-imports */

import PropTypes from "prop-types";
import "@/lib/i18n";
import "focus-visible";
import Script from "next/script";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import useAuthentication from "@/hooks/useAuthentication";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const SURVEY_SPARROW = process.env.NEXT_PUBLIC_SURVEY_SPARROW;

function Client({ Component, pageProps }) {
  const lang = pageProps?.data?.language || "en-US";

  const authData = useAuthentication({
    typeHandle: pageProps?.data?.typeHandle || "",
    language: lang,
    localized: pageProps?.data?.localized || [],
  });

  return (
    <AuthenticationContextProvider data={authData}>
      {PLAUSIBLE_DOMAIN && (
        <Script
          id="plausible-script"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
      )}
      {SURVEY_SPARROW && (
        <>
          <div id="ss_survey_widget"></div>
          <Script
            id="SS_SCRIPT"
            dangerouslySetInnerHTML={{
              __html: `
              function sparrowLaunch(opts) {
                // eslint-disable-next-line no-var, one-var
                var e = "ss-widget",
                  t = "script",
                  a = document,
                  r = window,
                  l = localStorage;
                // eslint-disable-next-line no-var, one-var
                var s,
                  n,
                  c,
                  rm = a.getElementById("SS_SCRIPT");
                r.SS_WIDGET_TOKEN = "tt-tTTCZh648ZKwCNkh91aodV";
                r.SS_ACCOUNT = "rockmanetal.surveysparrow.com";
                r.SS_SURVEY_NAME = "rubin-pop-up---chat-survey";
                if (
                  !a.getElementById(e) &&
                  !l.getItem("removed-ss-widget-tt-tTTCZh648ZKwCNkh91aodV")
                ) {
                  // eslint-disable-next-line no-var
                  var S = function () {
                    S.update(arguments);
                  };
                  S.args = [];
                  S.update = function (e) {
                    S.args.push(e);
                  };
                  r.SparrowLauncher = S;
                  s = a.getElementsByTagName(t);
                  c = s[s.length - 1];
                  n = a.createElement(t);
                  n.type = "text/javascript";
                  n.async = !0;
                  n.id = e;
                  n.src = [
                    "https://",
                    "rockmanetal.surveysparrow.com/widget/",
                    r.SS_WIDGET_TOKEN,
                    "?",
                    "customParams=",
                    JSON.stringify(opts),
                  ].join("");
                  c.parentNode.insertBefore(n, c);
                  r.SS_VARIABLES = opts;
                  rm.parentNode.removeChild(rm);
                }
              }
              sparrowLaunch({sparrowLang: "${lang}"});
            `,
            }}
          />
        </>
      )}
      <GlobalStyles />
      <Component {...pageProps} />
    </AuthenticationContextProvider>
  );
}

Client.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default Client;

/* eslint-enable unused-imports/no-unused-imports */
