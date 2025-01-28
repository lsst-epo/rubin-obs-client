import { FC } from "react";
import { generateMetadata as baseGeneradataMetadata } from "../../../app/[locale]/gallery/collections/[gallery]/layout";
import { getMainGallery } from "@/lib/api/galleries";
import { notFound } from "next/navigation";
import GalleryPage from "../GalleryPage";
import SlideshowCarousel from "@/components/organisms/SlideshowCarousel";

export const generateMetadata = async ({ params: { locale } }: LocaleProps) => {
  const data = await getMainGallery(locale);

  if (!data) {
    notFound();
  }

  const { gallery } = data;

  return baseGeneradataMetadata({ params: { locale, gallery } });
};

interface GalleryLandingPageProps {
  locale: string;
}

const GalleryLandingPage: FC<
  WithSearchParams<GalleryLandingPageProps>
> = async ({ locale, searchParams }) => {
  const data = await getMainGallery(locale);

  if (!data) {
    notFound();
  }

  const { gallery, slideshows, slideshowsUri } = data;

  return (
    <>
      {slideshows.length > 0 && (
        <SlideshowCarousel {...{ slideshows, slideshowsUri }} />
      )}
      <GalleryPage {...{ locale, gallery, searchParams }} />
    </>
  );
};

GalleryLandingPage.displayName = "Template.GalleryLandingPage";

export default GalleryLandingPage;
