import { FC, PropsWithChildren } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { striptags } from "@/lib/utils/strings";
import { generateNOIRLabMetadata } from "@/lib/api/noirlab";
import { resizeCantoImage } from "@/lib/api/canto/resize";
import {
  getEntriesByLocale,
  getEntrySectionByUri,
} from "@/lib/api/entries/index";
import { getEntryMetadataByUri } from "@/lib/api/metadata";
import { generateMetadata as galleryLandingPage } from "@/components/templates/GalleryLandingPage";

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

const metadataMap: Record<
  string,
  (
    props: WithSearchParams<UriSegmentProps>,
    parent?: ResolvingMetadata
  ) => Promise<Metadata>
> = {
  galleryLandingPage,
};

export async function generateMetadata(
  {
    params: { locale, uriSegments },
    searchParams = {},
  }: WithSearchParams<UriSegmentProps>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uri = uriSegments.join("/");

  const entrySectionType = await getEntrySectionByUri(uri, locale);

  // Handle 404 if there is no data
  if (!entrySectionType) {
    notFound();
  }

  const { typeHandle } = entrySectionType;

  if (metadataMap[typeHandle]) {
    return metadataMap[typeHandle](
      { params: { locale, uriSegments }, searchParams },
      parent
    );
  }

  const metadata = await getEntryMetadataByUri(uri, locale);

  if (!metadata?.entry) {
    notFound();
  }

  const {
    title,
    description,
    image = [],
    cantoAssetSingle = [],
    pressReleaseId,
    postType,
  } = metadata.entry as any;

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
  return getEntriesByLocale(locale);
}

const UriSegmentsLayout: FC<PropsWithChildren<UriSegmentProps>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default UriSegmentsLayout;
