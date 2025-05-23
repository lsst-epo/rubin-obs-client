import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { extractDescription, isRubinAsset } from "@/helpers/noirlab";

export const generateStaticParams = async ({
  params: { locale },
}: LocaleProps) => {
  const { data } = await MediaService.mediaImagesList({
    query: {
      lang: locale as Locale,
      translation_mode: "fallback",
      category: "rubin",
      page: 1,
      page_size: 50,
      tiny: true,
    },
  });

  return (
    data?.results?.map((image) => {
      return { asset: image.id };
    }) || []
  );
};

export const generateMetadata = async ({
  params: { locale, asset },
}: NOIRLabAssetProps<Locale>): Promise<Metadata> => {
  const { data, error } = await MediaService.mediaImagesRetrieve({
    path: { id: asset },
    query: { lang: locale, translation_mode: "fallback" },
  });

  if (error || !data || !isRubinAsset(data.categories)) {
    notFound();
  }

  const {
    title,
    description,
    formats: { screen640 },
  } = data;

  const images = screen640
    ? {
        url: screen640,
        secureUrl: screen640,
      }
    : undefined;

  return {
    title,
    description: extractDescription(description),
    openGraph: {
      images,
    },
  };
};

const NOIRLabImageAssetLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default NOIRLabImageAssetLayout;
