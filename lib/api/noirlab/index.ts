import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import {
  AnnouncementsService,
  ImageMini,
  ReleasesService,
} from "@/services/noirlab";
import { Locale } from "@/lib/i18n/settings";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";

export const NOIRLabServices = {
  "news-post": AnnouncementsService.announcementsRetrieve,
  "press-release": ReleasesService.releasesRetrieve,
};

export function getReleaseOpenGraph(
  images: Array<ImageMini> = []
): OpenGraph["images"] | undefined {
  const format = "screen640";

  const feature = images[0];

  if (!feature) return;

  const { title, height, width, formats } = feature;

  if (formats[format]) {
    return {
      alt: title,
      url: formats[format],
      height: height || undefined,
      width: width || undefined,
    };
  }
}

export function getReleaseHero(images: Array<ImageMini>) {
  if (!images) return;
  const feature = images[0];
  if (!feature) return;

  const { title, height, width, formats } = feature;

  return {
    altText: title,
    url: formats.banner1920,
    height,
    width,
  };
}

export const generateNOIRLabMetadata = async (
  id: string,
  postType: Array<{ slug: string }>,
  locale: string
): Promise<Metadata> => {
  const { slug } = postType[0];

  if (slug === "news-post") {
    const { data } = await AnnouncementsService.announcementsRetrieve({
      path: {
        id,
      },
      query: {
        lang: locale as Locale,
        translation_mode: "fallback",
      },
    });

    return {
      title: data?.title,
      description: data?.subtitle,
      twitter: {
        title: data?.title,
      },
      openGraph: {
        images: getReleaseOpenGraph(data?.images),
      },
    };
  }

  if (slug === "press-release") {
    const { data } = await ReleasesService.releasesRetrieve({
      path: {
        id,
      },
      query: {
        lang: locale as Locale,
        translation_mode: "fallback",
      },
    });

    return {
      title: data?.title,
      description: data?.headline,
      twitter: {
        title: data?.title,
      },
      openGraph: {
        images: getReleaseOpenGraph(data?.images),
      },
    };
  }

  return {};
};

export function makeReleaseFeature(
  images: Array<ImageMini>,
  format: keyof ImageMini["formats"] = "screen"
): Array<ImageShape> | undefined {
  if (!images) return;
  const feature = images[0];
  if (!feature) return;

  const { title, height, width, formats } = feature;
  const url = formats[format];

  if (!url) return;

  return [
    {
      altText: title,
      url,
      height: height ?? undefined,
      width: width ?? undefined,
    },
  ];
}
