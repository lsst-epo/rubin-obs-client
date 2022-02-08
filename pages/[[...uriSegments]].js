import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Loader from "@/components/svg/unique/Loader";
import { getGlobalData } from "@/api/global";
import { getAllEntries, getEntrySectionByUri } from "@/api/entries";
import { getEntryDataByUri } from "@/api/entry";
import { getBreadcrumbs } from "@/api/pages";
import { getGalleryItemDataByUri } from "@/lib/api/gallery-items";
import { getSlideshowDataByUri } from "@/api/slideshows";
import { getSiteString } from "@/lib/utils";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import PageTemplate from "@/templates/Page";
import EventPageTemplate from "@/templates/EventPage";
import GalleryPageTemplate from "@/templates/GalleryPage";
import HomePageTemplate from "@/templates/HomePage";
import NewsPageTemplate from "@/templates/NewsPage";
import SearchPageTemplate from "@/templates/SearchPage";
import SlideshowPageTemplate from "@/templates/SlideshowPage";
import StaffPageTemplate from "@/templates/StaffPage";
import internalLinkShape, {
  internalLinkWithChildrenShape,
} from "@/shapes/link";
import siteInfoShape from "@/shapes/siteInfo";
import footerContentShape from "@/shapes/footerContent";
import rootPagesShape from "@/shapes/rootPages";
import { updateI18n } from "@/lib/i18n";

const CRAFT_HOMEPAGE_URI = "__home__";

export default function Page({ section, globalData, ...entryProps }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loader />;
  }

  globalData.localeInfo.locale === "es" ? updateI18n("es") : updateI18n("en");

  const sectionMap = {
    events: EventPageTemplate,
    galleryItems: GalleryPageTemplate,
    homepage: HomePageTemplate,
    news: NewsPageTemplate,
    searchResults: SearchPageTemplate,
    slideshows: SlideshowPageTemplate,
    staffProfiles: StaffPageTemplate,
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
  };
  const getData = dataMap[section] || getEntryDataByUri;
  return await getData(uri, site, previewToken);
}

export async function getStaticPaths() {
  return {
    paths: await getAllEntries(),
    fallback: true,
  };
}

export async function getStaticProps({ params: { uriSegments }, previewData }) {
  const site = getSiteString(uriSegments);
  const uri =
    uriSegments && uriSegments.length
      ? uriSegments.join("/")
      : CRAFT_HOMEPAGE_URI;

  const data = await getGlobalData();

  // add _es to property names if site is "es"
  const isEspanol = site === "es";
  const globals = data[`globals${isEspanol ? "_es" : ""}`].reduce(
    (obj, item) =>
      Object.assign(obj, Object.keys(item).length && { [item.handle]: item }),
    {}
  );

  // TODO: cache this from getStaticPaths and reuse here
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
    categories: data[`allCategories${isEspanol ? "_es" : ""}`],
    footerContent: globals.footer,
    headerNavItems: data[`pageTree${isEspanol ? "_es" : ""}`],
    rootPages: globals.rootPageInformation.customBreadcrumbs,
    siteInfo: globals.siteInfo,
    localeInfo: {
      locale: site,
      language: entryData?.language || entryData?.entry?.language || "",
      localized: entryData?.localized || entryData?.entry?.localized || [],
    },
  };

  // Handle 404 if there is no data
  if (!currentId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: entryData,
      section,
      globalData,
      breadcrumbs,
    },
    revalidate: 30,
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
  }),
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
};
