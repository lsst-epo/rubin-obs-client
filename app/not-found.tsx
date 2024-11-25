import { FunctionComponent, Suspense } from "react";
import SourceSansPro from "@/lib/styles/font";
import StyledComponentsRegistry from "@/lib/styles/registry";
import { GlobalStyles } from "@rubin-epo/epo-react-lib/styles";
import I18NextClientProvider from "@/contexts/i18next";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageWrapper from "@/components/organisms/PageWrapper";
import { useTranslation } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import Error from "@/components/organisms/Error";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID || "";

const NotFound: FunctionComponent = async () => {
  const locale = getLocale();
  const { t } = await useTranslation(locale, "translation");

  return (
    <html lang={locale}>
      <head></head>
      <body className={SourceSansPro.variable}>
        <I18NextClientProvider {...{ locale }}>
          <Suspense>
            <AuthenticationContextProvider>
              <StyledComponentsRegistry>
                <GoogleOAuthProvider clientId={GOOGLE_APP_ID}>
                  <GlobalStyles />
                  <PageWrapper {...{ locale }}>
                    <Error
                      title={t("page-not-found-title")}
                      message={t("page-not-found-text")}
                    />
                  </PageWrapper>
                </GoogleOAuthProvider>
              </StyledComponentsRegistry>
            </AuthenticationContextProvider>
          </Suspense>
        </I18NextClientProvider>
      </body>
    </html>
  );
};

export default NotFound;
