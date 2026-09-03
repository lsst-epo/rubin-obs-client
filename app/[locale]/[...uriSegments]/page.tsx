import { FunctionComponent } from "react";
import { notFound, redirect, RedirectType } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBreadcrumbsById } from "@/lib/api/metadata";
import { getEntrySectionByUri } from "@/lib/api/entries/index";
import { getEntryDataByUri } from "@/lib/api/entry";
import PageTemplate from "@/components/templates/Page";
import NewsPageTemplate from "@/components/templates/NewsPage";
import RubinBasicsPage from "@/components/templates/RubinBasicsPage";
import GlossaryPageTemplate from "@/components/templates/GlossaryPage";
import SlideshowPageTemplate from "@/components/templates/SlideshowPage";
import StaffPageTemplate from "@/components/templates/StaffPage";
import EventPageTemplate from "@/components/templates/EventPage";
import GalleryLandingPageTemplate from "@/components/templates/GalleryLandingPage";

const sectionMap = {
  events: EventPageTemplate,
  glossaryTerms: GlossaryPageTemplate,
  news: NewsPageTemplate,
  rubinBasics: RubinBasicsPage,
  slideshows: SlideshowPageTemplate,
  staffProfiles: StaffPageTemplate,
};

const pageMap = {
  galleryLandingPage: GalleryLandingPageTemplate,
};

const UriSegmentsPage: FunctionComponent<
  WithSearchParams<UriSegmentProps>
> = async ({ params: { locale, uriSegments }, searchParams = {} }) => {
  setRequestLocale(locale);
  const uri = uriSegments.join("/");
  let overrideLocale: any = null;

  // console.info("[debug] inside of /app/[locale]/[...uriSegments]/page.tsx for locale: ", locale);
  let entrySectionType = await getEntrySectionByUri(uri, locale);
  // console.info("[debug] logging entrySectionType: ", entrySectionType);

  // Handle 404 if there is no data
  if (!entrySectionType) {
    if (locale !== "en") {
      // console.info("[debug] not an english query, falling back to english for getEntrySectionByUri")
      entrySectionType = await getEntrySectionByUri(uri, "en");
      // console.info("[debug] logging entrySectionType for english fallback: ", entrySectionType);
      if (!entrySectionType) {
        notFound();
      } else {
        overrideLocale = "en";
      }
    }
  }

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const data = await getEntryDataByUri(
    uri,
    section,
    type,
    overrideLocale || locale
  );

  // Handle redirect if the entry has one
  if (data?.typeHandle === "redirectPage" && data?.linkTo?.url) {
    redirect(data.linkTo.url, RedirectType.replace);
  }

  const currentId = data?.id || data?.entry?.id;

  // Handle 404 if there is no data
  if (!currentId) {
    console.info(
      "[debug] returning a notFound from page for currentId: ",
      currentId
    );
    notFound();
  }

  const breadcrumbs = await getBreadcrumbsById(parseInt(currentId), locale);
  // console.info("[debug] logging breadcrumbs: ", breadcrumbs);

  const Template = sectionMap[section] || pageMap[type] || PageTemplate;
  // console.info("[debug] logging Template: ", Template)

  return (
    <>
      {overrideLocale && (
        <div>
          This page has not been translated to your language yet, showing
          English versionz
        </div>
      )}
      <Template
        {...{
          section,
          breadcrumbs,
          data,
          locale,
          searchParams,
          overrideLocale,
        }}
      />
    </>
  );
};

export default UriSegmentsPage;
