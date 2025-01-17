import { FC } from "react";
import Gallery from "./[gallery]/page";
import { generateMetadata as baseGeneradataMetadata } from "./[gallery]/layout";
import { getMainGallery } from "@/lib/api/galleries";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params: { locale } }: LocaleProps) => {
  const data = await getMainGallery(locale);

  if (!data) {
    notFound();
  }

  const { gallery } = data;

  return baseGeneradataMetadata({ params: { locale, gallery } });
};

const MainGallery: FC<WithSearchParams<LocaleProps>> = async ({
  params: { locale },
  searchParams = {},
}) => {
  const data = await getMainGallery(locale);

  if (!data) {
    notFound();
  }

  const { gallery } = data;

  return (
    <Gallery
      params={{ locale, gallery }}
      searchParams={{ ...searchParams, renderedFrom: "mainGallery" }}
    />
  );
};

export default MainGallery;
