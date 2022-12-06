import PropTypes from "prop-types";
import { getGlobalData } from "@/api/global";
import { getAllEntries, getEntrySectionByUri } from "@/api/entries";
import { getEntryDataByUri } from "@/api/entry";
import { getBreadcrumbs } from "@/api/pages";
import { getGalleryItemDataByUri } from "@/lib/api/gallery-items";
import { getGlossaryTermDataByUri } from "@/lib/api/glossary-terms";
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

const CRAFT_HOMEPAGE_URI = "__home__";

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

async function getEntryData(uri, section, site, previewToken) {
  const dataMap = {
    galleryItems: getGalleryItemDataByUri,
    slideshows: getSlideshowDataByUri,
    glossaryTerms: getGlossaryTermDataByUri,
  };
  const getData = dataMap[section] || getEntryDataByUri;
  return await getData(uri, site, previewToken);
}

export async function getStaticPaths() {
  return {
    paths: await getAllEntries(),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { uriSegments }, previewData }) {
  const runId = Date.now().toString();
  const site = getSiteString(uriSegments);
  const uri =
    uriSegments && uriSegments.length
      ? uriSegments.join("/")
      : CRAFT_HOMEPAGE_URI;
  setEdcLog(runId, "Starting new client build for " + site, "BUILD_START");

  const data = await getGlobalData();
  // add _es to property names if site is "es"
  const isEspanol = site === "es";

  // Beginning of bug fix
  // .reduce() needs to check for null before attempting to use
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

  const section = await getEntrySectionByUri(uri, site);

  const entryData = await getEntryData(
    uri,
    section,
    site,
    previewData?.previewToken
  );

  const currentId = entryData?.id || entryData?.entry?.id;

  const breadcrumbs = await getBreadcrumbs(
    currentId,
    site,
    previewData?.previewToken
  );

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
