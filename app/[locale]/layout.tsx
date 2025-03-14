import { FunctionComponent, PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalStyles } from "@rubin-epo/epo-react-lib/styles";
import { getGlobalData } from "@/lib/api/globals";
import { languages } from "@/lib/i18n/settings";
import SourceSansPro from "@/lib/styles/font";
import StyledComponentsRegistry from "@/lib/styles/registry";
import I18NextClientProvider from "@/contexts/i18next";
import { AuthenticationContextProvider } from "@/contexts/Authentication";
import PageWrapper from "@/components/organisms/PageWrapper";
import RootScripts from "./scripts";
import { HistoryProvider } from "@/contexts/History";
import PreviewMode from "@/components/organisms/PreviewMode";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID || "";

export async function generateMetadata({
  params: { locale },
}: LocaleProps): Promise<Metadata> {
  if (!languages.includes(locale)) {
    notFound();
  }

  const { siteInfo: metadata } = await getGlobalData(locale);
  const { siteTitle, siteDescription, siteImage, language, twitter } = metadata;
  const { url, width, height, altText: alt } = siteImage[0];

  return {
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
      : undefined,
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    manifest: "/site.webmanifest",
    alternates: { canonical: "./" },
    openGraph: {
      locale: language,
      images: [{ url, width, height, alt }],
    },
    twitter: {
      card: "summary_large_image",
      site: `@${twitter.substring(twitter.lastIndexOf("/") + 1)}`,
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
    robots: {
      googleBot: {
        "max-image-preview": "large",
      },
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
            <HistoryProvider>
              <AuthenticationContextProvider>
                <StyledComponentsRegistry>
                  <GoogleOAuthProvider clientId={GOOGLE_APP_ID}>
                    <GlobalStyles />
                    <PreviewMode>
                      <PageWrapper {...{ locale }}>{children}</PageWrapper>
                    </PreviewMode>
                  </GoogleOAuthProvider>
                </StyledComponentsRegistry>
              </AuthenticationContextProvider>
            </HistoryProvider>
          </Suspense>
        </I18NextClientProvider>
        <RootScripts {...{ locale }} />
      </body>
    </html>
  );
};

export default LocaleLayout;
