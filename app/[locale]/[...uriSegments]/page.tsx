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
import Banner from "@/components/atomic/Banner";

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
  const FALLBACK_LOCALE = "en";
  let overrideLocale: string = "";
  let entrySectionType = await getEntrySectionByUri(uri, locale);

  // Handle 404 if there is no data
  if (!entrySectionType) {
    /**
     * Check if locale === `en`, if not perform fallback GQL query to show
     * `en` version
     */
    if (locale !== FALLBACK_LOCALE) {
      entrySectionType = await getEntrySectionByUri(uri, FALLBACK_LOCALE);
      if (!entrySectionType) {
        notFound();
      } else {
        overrideLocale = FALLBACK_LOCALE;
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
    notFound();
  }

  const breadcrumbs = await getBreadcrumbsById(parseInt(currentId), locale);
  const Template = sectionMap[section] || pageMap[type] || PageTemplate;

  return (
    <>
      {overrideLocale && (
        <Banner text={"Esta página aún no se ha traducido a su idioma; se muestra la versión en inglés."}
                theme={"warning"}/>
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
