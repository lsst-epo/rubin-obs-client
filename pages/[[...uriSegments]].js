import PropTypes from "prop-types";
import { getGlobalData } from "@/api/global";
import { getAllEntries } from "@/api/entries";
import { getEntryDataByUri, getEntrySectionTypeByUri } from "@/api/entry";
import { getBreadcrumbs } from "@/api/pages";
import { getGalleryItemDataByUri } from "@/lib/api/gallery-items";
import { getSlideshowDataByUri } from "@/api/slideshows";
import { getSiteString } from "@/lib/utils";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import PageTemplate from "@/templates/Page";
import EventPageTemplate from "@/templates/EventPage";
import GalleryPageTemplate from "@/templates/GalleryPage";
import GlossaryPageTemplate from "@/templates/GlossaryPage";
import HomePageTemplate from "@/templates/HomePage";
import NewsPageTemplate from "@/templates/NewsPage";
import SearchPageTemplate from "@/templates/SearchPage";
import SlideshowPageTemplate from "@/templates/SlideshowPage";
import StaffPageTemplate from "@/templates/StaffPage";
import UserProfilePageTemplate from "@/templates/UserProfilePage";
import internalLinkShape, {
  internalLinkWithChildrenShape,
} from "@/shapes/link";
import siteInfoShape from "@/shapes/siteInfo";
import footerContentShape from "@/shapes/footerContent";
import rootPagesShape from "@/shapes/rootPages";
import { updateI18n } from "@/lib/i18n";
import { setEdcLog } from "@/lib/edc-log";
const glob = require("glob");
const fs = require("fs");

const CRAFT_HOMEPAGE_URI = "__home__";

function getDirectories(src, callback) {
  glob(src + "/**/*", { dot: true }, callback);
}

function logNextDir() {
  let BUILD_ID = "";

  fs.readFile(".next/BUILD_ID", (err, text) => {
    if (err) {
      console.error(err);
    }
    BUILD_ID = text.toString();
  });
  getDirectories(".next/server/pages", (err, res) => {
    if (err) {
      console.error("Error:", err);
    } else {
      const logInfo = {
        uptime: process.uptime(),
        build_id: BUILD_ID,
        files: res,
      };
      console.info("node_next_logging:", JSON.stringify(logInfo));
    }
  });
}

export default function Page({ section, globalData, ...entryProps }) {
  globalData.localeInfo.locale === "es" ? updateI18n("es") : updateI18n("en");

  const sectionMap = {
    events: EventPageTemplate,
    galleryItems: GalleryPageTemplate,
    glossaryTerms: GlossaryPageTemplate,
    homepage: HomePageTemplate,
    news: NewsPageTemplate,
    searchResults: SearchPageTemplate,
    slideshows: SlideshowPageTemplate,
    staffProfiles: StaffPageTemplate,
    userProfilePage: UserProfilePageTemplate,
  };

  const Template = sectionMap[section] || PageTemplate;

  return (
    <GlobalDataProvider data={globalData}>
      <Template {...entryProps} />
    </GlobalDataProvider>
  );
}

async function getEntryData(uri, section, type, site, previewToken) {
  const dataMap = {
    galleryItems: getGalleryItemDataByUri,
    slideshows: getSlideshowDataByUri,
  };

  if (dataMap[section]) {
    const getData = dataMap[section];
    return await dataMap[section](uri, site, previewToken);
  }

  return await getEntryDataByUri(uri, section, type, site, previewToken);
}

export async function getStaticPaths() {
  return {
    paths: await getAllEntries(),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { uriSegments }, previewData }) {
  const PREVIEW_SLUG = process.env.NEXT_PREVIEW_SLUG;

  if (process.env.NEXT_DEBUG_LOGGING === "true") {
    logNextDir();
  }

  const runId = Date.now().toString();
  const isPreview = previewData && uriSegments[0] === PREVIEW_SLUG;
  const site = getSiteString(isPreview ? previewData.uriSegments : uriSegments);
  let uri = CRAFT_HOMEPAGE_URI;
  let previewToken;

  if (isPreview) {
    uri = previewData.uriSegments.join("/");
    previewToken = previewData?.previewToken;
  } else if (uriSegments && uriSegments.length) {
    uri = uriSegments.join("/");
  }

  setEdcLog(runId, "Starting new client build for " + site, "BUILD_START");
  const data = await getGlobalData();
  // add _es to property names if site is "es"
  const isEspanol = site === "es";

  const globalKey = `globals${isEspanol ? "_es" : ""}`;
  let globals;
  if (data[globalKey] === undefined || data[globalKey] === null) {
    globals = {};
  } else {
    globals = data[globalKey].reduce(
      (obj, item) =>
        Object.assign(obj, Object.keys(item).length && { [item.handle]: item }),
      {}
    );
  }

  const entrySectionType = await getEntrySectionTypeByUri(
    uri,
    site,
    previewToken
  );

  // Handle 404 if there is no data
  if (!entrySectionType) {
    setEdcLog(runId, "404 encountered building for " + uri, "BUILD_ERROR_404");
    return {
      notFound: true,
    };
  }

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const entryData = await getEntryData(
    uri,
    section,
    type,
    site,
    previewToken
  );

  const currentId = entryData?.id || entryData?.entry?.id;

  const breadcrumbs = await getBreadcrumbs(currentId, site);
  const globalData = {
    categories: data?.[`allCategories${isEspanol ? "_es" : ""}`] || [],
    footerContent: globals?.footer || {},
    contactForm: globals?.contactForm || {},
    headerNavItems: data?.[`pageTree${isEspanol ? "_es" : ""}`] || [],
    rootPages: globals?.rootPageInformation?.customBreadcrumbs || [],
    siteInfo: globals?.siteInfo || {},
    localeInfo: {
      locale: site,
      language: entryData?.language || entryData?.entry?.language || "",
      localized: entryData?.localized || entryData?.entry?.localized || [],
    },
    userProfilePage: data?.[`userProfilePage${isEspanol ? "_es" : ""}`] || {},
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
    return {
      notFound: true,
    };
  }
  setEdcLog(runId, "Done building for " + uri, "BUILD_COMPLETE");

  return {
    props: {
      data: entryData,
      section,
      globalData,
      breadcrumbs,
    },
    revalidate: 300,
  };
}

Page.displayName = "Entry.Page";

Page.propTypes = {
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
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
};
