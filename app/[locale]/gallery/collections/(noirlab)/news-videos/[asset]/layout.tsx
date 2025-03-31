import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { extractDescription, isRubinAsset } from "@/helpers/noirlab";

export const generateMetadata = async ({
  params: { locale, asset },
}: NOIRLabAssetProps<Locale>): Promise<Metadata> => {
  const { data, error } = await MediaService.mediaVideosRetrieve({
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
    formats: { thumb350x },
  } = data;

  const images = thumb350x
    ? {
        url: thumb350x,
        secureUrl: thumb350x,
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

const NOIRLabVideoAssetLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default NOIRLabVideoAssetLayout;

export const revalidate = 3600;
