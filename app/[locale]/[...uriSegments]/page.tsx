import { FunctionComponent } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import striptags from "striptags";
import { getBreadcrumbsById, getEntryMetadataByUri } from "@/lib/api/metadata";
import {
  getEntriesByLocale,
  getEntrySectionByUri,
} from "@/lib/api/entries/index";
import { getEntryDataByUri } from "@/lib/api/entry";
import { generateNOIRLabMetadata } from "@/lib/api/noirlab";
import { resizeCantoImage } from "@/lib/api/canto/resize";
import PageTemplate from "@/components/templates/Page";
import NewsPageTemplate from "@/components/templates/NewsPage";
import GlossaryPageTemplate from "@/components/templates/GlossaryPage";
import SearchPageTemplate from "@/components/templates/SearchPage";
import SlideshowPageTemplate from "@/components/templates/SlideshowPage";
import StaffPageTemplate from "@/components/templates/StaffPage";
import EventPageTemplate from "@/components/templates/EventPage";

const pickFeaturedImage = async (
  image?: any,
  cantoAsset?: any
): Promise<OpenGraph["images"] | undefined> => {
  if (cantoAsset) {
    const {
      width,
      height,
      url: { directUrlPreview },
    } = cantoAsset;
    const url = resizeCantoImage(directUrlPreview, 800);

    return { url, width, height };
  }

  if (image) {
    const { url, width, height, altText: alt } = image;

    return { url, width, height, alt };
  }
};

export async function generateMetadata(
  { params: { locale, uriSegments }, searchParams = {} }: UriSegmentProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uri = uriSegments.join("/");
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const { entry } = await getEntryMetadataByUri(uri, locale, previewToken);

  if (!entry) {
    notFound();
  }

  const {
    title,
    description,
    image = [],
    cantoAssetSingle = [],
    pressReleaseId,
    postType,
  } = entry;

  const previousImages = (await parent).openGraph?.images || [];

  if (pressReleaseId) {
    return generateNOIRLabMetadata(pressReleaseId, postType, locale);
  }

  const featuredImage = await pickFeaturedImage(image[0], cantoAssetSingle[0]);

  return {
    title,
    description: striptags(description),
    openGraph: {
      images: featuredImage || previousImages,
    },
  };
}

export async function generateStaticParams({
  params: { locale },
}: LocaleProps) {
  const data = await getEntriesByLocale(locale);

  return data.entries.map(({ uri }) => {
    return {
      locale,
      uriSegments: uri.split("/"),
    };
  });
}

const sectionMap = {
  events: EventPageTemplate,
  // galleryItems: GalleryPageTemplate,
  glossaryTerms: GlossaryPageTemplate,
  news: NewsPageTemplate,
  searchResults: SearchPageTemplate,
  slideshows: SlideshowPageTemplate,
  staffProfiles: StaffPageTemplate,
  // userProfilePage: UserProfilePageTemplate,
};

const UriSegmentsPage: FunctionComponent<UriSegmentProps> = async ({
  params: { locale, uriSegments },
  searchParams,
}) => {
  const uri = uriSegments.join("/");
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const entrySectionType = await getEntrySectionByUri(
    uri,
    locale,
    previewToken
  );

  // Handle 404 if there is no data
  if (!entrySectionType) {
    notFound();
  }

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const data = await getEntryDataByUri(
    uri,
    section,
    type,
    locale,
    previewToken
  );

  // Handle redirect if the entry has one
  if (data?.typeHandle === "redirectPage" && data?.linkTo?.url) {
    redirect(data.linkTo.url, "replace");
  }

  const currentId = data?.id || data?.entry?.id;

  // Handle 404 if there is no data
  if (!currentId) {
    notFound();
  }

  const breadcrumbs = await getBreadcrumbsById(parseInt(currentId), locale);

  const Template = sectionMap[section] || PageTemplate;

  return <Template {...{ section, breadcrumbs, data, previewToken, locale }} />;
};

export default UriSegmentsPage;
