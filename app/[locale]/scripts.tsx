import { FunctionComponent } from "react";
import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const SURVEY_SPARROW = process.env.NEXT_PUBLIC_SURVEY_SPARROW;

const RootScripts: FunctionComponent<{ locale: string }> = ({ locale }) => {
  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <Script
          id="plausible-script"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
        />
      )}
      {SURVEY_SPARROW && (
        <>
          <div id="ss_survey_widget" />
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
          sparrowLaunch({sparrowLang: "${locale}"});
        `,
            }}
          />
        </>
      )}
    </>
  );
};

export default RootScripts;
