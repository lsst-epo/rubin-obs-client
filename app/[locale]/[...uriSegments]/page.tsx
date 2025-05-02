import { FunctionComponent } from "react";
import { notFound, redirect, RedirectType } from "next/navigation";
import { getBreadcrumbsById } from "@/lib/api/metadata";
import { getEntrySectionByUri } from "@/lib/api/entries/index";
import { getEntryDataByUri } from "@/lib/api/entry";
import PageTemplate from "@/components/templates/Page";
import NewsPageTemplate from "@/components/templates/NewsPage";
import GlossaryPageTemplate from "@/components/templates/GlossaryPage";
import SlideshowPageTemplate from "@/components/templates/SlideshowPage";
import StaffPageTemplate from "@/components/templates/StaffPage";
import EventPageTemplate from "@/components/templates/EventPage";
import GalleryLandingPageTemplate from "@/components/templates/GalleryLandingPage";

const sectionMap = {
  events: EventPageTemplate,
  glossaryTerms: GlossaryPageTemplate,
  news: NewsPageTemplate,
  slideshows: SlideshowPageTemplate,
  staffProfiles: StaffPageTemplate,
};

const pageMap = {
  galleryLandingPage: GalleryLandingPageTemplate,
};

const UriSegmentsPage: FunctionComponent<
  WithSearchParams<UriSegmentProps>
> = async ({ params: { locale, uriSegments }, searchParams = {} }) => {
  const uri = uriSegments.join("/");

  const entrySectionType = await getEntrySectionByUri(uri, locale);

  // Handle 404 if there is no data
  if (!entrySectionType) {
    notFound();
  }

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const data = await getEntryDataByUri(uri, section, type, locale);

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

  return <Template {...{ section, breadcrumbs, data, locale, searchParams }} />;
};

export const dynamic = "force-dynamic";

export default UriSegmentsPage;
