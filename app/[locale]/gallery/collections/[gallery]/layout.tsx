import { FunctionComponent, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllGallerySlugs, getGalleryMetadata } from "@/lib/api/galleries";
import { assetToOpenGraphImage } from "@/lib/api/canto/metadata";

export async function generateStaticParams({
  params: { locale },
}: LocaleProps) {
  return getAllGallerySlugs(locale);
}

export async function generateMetadata({
  params: { locale, gallery },
}: GalleryProps): Promise<Metadata> {
  const metadata = await getGalleryMetadata(gallery, locale);

  if (!metadata) {
    notFound();
  }

  const { title, description, representativeImage } = metadata;

  return {
    title,
    description,
    openGraph: {
      images: representativeImage
        ? assetToOpenGraphImage(representativeImage, locale)
        : undefined,
    },
  };
}

export const GalleryLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <>{children}</>;
};

export default GalleryLayout;
