import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { client, ImageMini, ReleasesService } from "./codegen";
import { Locale } from "@/lib/i18n/settings";

client.setConfig({
  baseUrl: "https://noirlab.edu",
});

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

export const generateReleaseMetadata = async (id: string, locale: string) => {
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
    description: data?.subtitle,
    twitter: {
      title: data?.title,
    },
    openGraph: {
      images: getReleaseOpenGraph(data?.images),
    },
  };
};
