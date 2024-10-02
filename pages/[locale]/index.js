import PropTypes from "prop-types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { languages } from "@/lib/i18n/settings";
import { getGlobalData } from "@/api/global";
import { getEntrySectionTypeByUri, getEntryDataByUri } from "@/api/entry";
import { setEdcLog } from "@/lib/edc-log";
import { getSiteFromLocale } from "@/lib/utils";
import { purgeNextjsStaticFiles } from "@/lib/purgeStaticFiles";
import { internalLinkWithChildrenShape } from "@/shapes/link";
import siteInfoShape from "@/shapes/siteInfo";
import footerContentShape from "@/shapes/footerContent";
import rootPagesShape from "@/shapes/rootPages";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import HomePageTemplate from "@/templates/HomePage";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;
const CRAFT_HOMEPAGE_URI = "__home__";

export function getStaticPaths() {
  return {
    paths: languages.map((language) => {
      return { params: { locale: language } };
    }),
    fallback: false,
  };
}

/** @type {import("next").GetStaticProps } */
export async function getStaticProps({
  params: { locale },
  previewData,
  draftMode,
}) {
  const runId = Date.now().toString();
  const site = getSiteFromLocale(locale);
  const uri = CRAFT_HOMEPAGE_URI;
  const previewToken = draftMode ? previewData?.previewToken : undefined;

  const data = await getGlobalData(site);

  const globals = data.globals
    ? data.globals.reduce(
        (obj, item) =>
          Object.assign(
            obj,
            Object.keys(item).length && { [item.handle]: item }
          ),
        {}
      )
    : {};

  const entrySectionType = await getEntrySectionTypeByUri(
    uri,
    site,
    previewToken
  );

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const entryData = await getEntryDataByUri(
    uri,
    section,
    type,
    site,
    previewToken
  );

  const currentId = entryData?.id || entryData?.entry?.id;

  const globalData = {
    categories: data?.allCategories || [],
    footerContent: globals?.footer || {},
    contactForm: globals?.contactForm || {},
    headerNavItems: data?.pageTree || [],
    rootPages: globals?.rootPageInformation?.customBreadcrumbs || [],
    siteInfo: globals?.siteInfo || {},
    localeInfo: {
      locale: site,
      language: entryData?.language || entryData?.entry?.language || "",
      localized: entryData?.localized || entryData?.entry?.localized || [],
    },
    userProfilePage: data?.userProfilePage || {},
  };

  // Handle redirect if the entry has one
  if (entryData?.typeHandle === "redirectPage" && entryData?.linkTo?.url) {
    setEdcLog(runId, "Redirect build done for " + uri, "BUILD_REDIRECT");
    return {
      redirect: {
        destination: entryData.linkTo.url,
        permanent: false,
      },
    };
  }

  // Handle 404 if there is no data
  if (!currentId) {
    setEdcLog(runId, "404 encountered building for " + uri, "BUILD_ERROR_404");
    await purgeNextjsStaticFiles(locale);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  setEdcLog(runId, "Done building for " + uri, "BUILD_COMPLETE");

  return {
    props: { locale, data: entryData, section, globalData },
    revalidate: 300,
  };
}

const Homepage = ({ section, globalData, ...entryProps }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_APP_ID}>
      <GlobalDataProvider data={globalData}>
        <HomePageTemplate {...entryProps} />
      </GlobalDataProvider>
    </GoogleOAuthProvider>
  );
};

Homepage.propTypes = {
  data: PropTypes.object,
  section: PropTypes.string,
  globalData: PropTypes.exact({
    categories: PropTypes.array,
    footerContent: footerContentShape,
    headerNavItems: PropTypes.arrayOf(internalLinkWithChildrenShape),
    localeInfo: PropTypes.object,
    rootPages: rootPagesShape,
    siteInfo: siteInfoShape,
    userProfilePage: PropTypes.object,
    contactForm: PropTypes.object,
  }),
};

export default Homepage;
