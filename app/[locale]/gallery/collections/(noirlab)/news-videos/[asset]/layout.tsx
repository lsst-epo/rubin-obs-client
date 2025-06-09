import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { extractDescription, isRubinAsset } from "@/helpers/noirlab";

export const generateStaticParams = async ({
  params: { locale },
}: LocaleProps) => {
  const { data } = await MediaService.mediaVideosList({
    query: {
      lang: locale as Locale,
      translation_mode: "fallback",
      category: "rubin",
      page: 1,
      page_size: 50,
    },
  });

  return (
    data?.results?.map((video) => {
      return { asset: video.id };
    }) || []
  );
};

export const generateMetadata = async ({
  params: { locale, asset },
}: NOIRLabAssetProps<Locale>): Promise<Metadata> => {
  const { data, error } = await MediaService.mediaVideosRetrieve({
    path: { id: asset },
    query: { lang: locale, translation_mode: "fallback" },
  });

  if (error || !data || !isRubinAsset(data.categories)) {
    notFound();
  }

  const {
    title,
    description,
    formats: { thumb350x, hd_1080_screen: videoUrl },
  } = data;

  const hasVideo = !!videoUrl;

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
      videos: hasVideo
        ? {
            url: videoUrl,
            width: 1920,
            height: 1080,
          }
        : undefined,
    },
    twitter: hasVideo
      ? {
          card: "player",
          players: {
            playerUrl: videoUrl,
            streamUrl: videoUrl,
            width: 1920,
            height: 1080,
          },
        }
      : undefined,
  };
};

const NOIRLabVideoAssetLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default NOIRLabVideoAssetLayout;
