import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { extractDescription, isRubinAsset } from "@/helpers/noirlab";

export const generateMetadata = async ({
  params: { locale, asset },
}: NOIRLabAssetProps<Locale>): Promise<Metadata> => {
  const { data, error } = await MediaService.mediaImagesRetrieve({
    path: { id: asset },
    query: { lang: locale, translation_mode: "fallback" },
    cache: "force-cache",
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

export const revalidate = 3600;
