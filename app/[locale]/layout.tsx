import { FunctionComponent, PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalStyles from "@/styles/globalStyles";
import { getGlobalData } from "@/lib/api/globals";
import { languages } from "@/lib/i18n/settings";
import SourceSansPro from "@/lib/styles/font";
import StyledComponentsRegistry from "@/lib/styles/registry";
import I18NextClientProvider from "@/contexts/i18next";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import PageWrapper from "@/components/organisms/PageWrapper";
import RootScripts from "./scripts";
import { notFound } from "next/navigation";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID || "";

export async function generateMetadata({
  params: { locale },
}: LocaleProps): Promise<Metadata> {
  if (!languages.includes(locale)) {
    notFound();
  }

  const { siteInfo: metadata } = await getGlobalData(locale);
  const { siteTitle, siteDescription, siteImage, language } = metadata;
  const { url, width, height, altText: alt } = siteImage[0];

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    manifest: "/site.webmanifest",
    openGraph: {
      locale: language,
      images: [{ url, width, height, alt }],
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export const generateStaticParams = () => {
  return languages.map((locale) => {
    return { locale };
  });
};

export const dynamic = "force-dynamic";

const LocaleLayout: FunctionComponent<PropsWithChildren<LocaleProps>> = async ({
  params: { locale },
  children,
}) => {
  if (!languages.includes(locale)) {
    notFound();
  }

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
                  <PageWrapper {...{ locale }}>{children}</PageWrapper>
                </GoogleOAuthProvider>
              </StyledComponentsRegistry>
            </AuthenticationContextProvider>
          </Suspense>
        </I18NextClientProvider>
        <RootScripts {...{ locale }} />
      </body>
    </html>
  );
};

export default LocaleLayout;
