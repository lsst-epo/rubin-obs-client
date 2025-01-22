import { FC } from "react";
import { generateMetadata as baseGeneradataMetadata } from "../../../app/[locale]/gallery/collections/[gallery]/layout";
import { getMainGallery } from "@/lib/api/galleries";
import { notFound } from "next/navigation";
import GalleryPage from "../GalleryPage";

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

  const { gallery } = data;

  return <GalleryPage {...{ locale, gallery, searchParams }} />;
};

GalleryLandingPage.displayName = "Template.GalleryLandingPage";

export default GalleryLandingPage;
