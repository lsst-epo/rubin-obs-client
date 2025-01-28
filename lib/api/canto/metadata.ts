import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { fallbackLng } from "@/lib/i18n/settings";
import { getPreviewSize } from "./resize";
import {
  CantoAssetAdditional,
  CantoAssetDetailed,
  CantoAssetMetadata,
} from "../galleries/schema";

export const assetTitle = (
  additional: {
    TitleEN: string | null;
    TitleES: string | null;
  },
  locale = fallbackLng
): string => {
  const localeKey = locale.toUpperCase();
  const defaultLocaleKey = fallbackLng.toUpperCase();

  return (
    additional[`Title${localeKey}`] ||
    additional[`Title${defaultLocaleKey}`] ||
    ""
  );
};

export const assetCaption = (
  additional: CantoAssetAdditional,
  locale = fallbackLng
): string => {
  const localeKey = locale.toUpperCase();
  const defaultLocaleKey = fallbackLng.toUpperCase();

  return (
    additional[`Caption${localeKey}`] ||
    additional[`Caption${defaultLocaleKey}`] ||
    ""
  );
};

export const assetAlt = (
  additional: Pick<CantoAssetAdditional, "AltTextEN" | "AltTextES">,
  locale = fallbackLng
): string => {
  const localeKey = locale.toUpperCase();
  const defaultLocaleKey = fallbackLng.toUpperCase();

  return (
    additional[`AltText${localeKey}`] ||
    additional[`AltText${defaultLocaleKey}`] ||
    ""
  );
};

export const assetToPageMetadata = (
  asset: CantoAssetDetailed,
  locale: string
): Metadata => {
  const {
    name,
    additional,
    scheme,
    width,
    height,
    url: { directUrlOriginal, directUrlPreviewPlay },
  } = asset;

  const twitterVideo: Twitter = {
    card: "player",
    players: {
      playerUrl: directUrlPreviewPlay || directUrlOriginal,
      streamUrl: directUrlPreviewPlay || directUrlOriginal,
      width,
      height,
    },
  };

  return {
    title: assetTitle(additional, locale) || name,
    description: assetCaption(additional, locale),
    openGraph: {
      images: assetToOpenGraphImage(asset, locale),
    },
    twitter: scheme === "video" ? twitterVideo : undefined,
  };
};

export const assetToOpenGraphImage = (
  asset: CantoAssetMetadata,
  locale = fallbackLng
): OpenGraph["images"] | undefined => {
  const {
    additional,
    width,
    height,
    url: { directUrlPreview },
  } = asset;

  if (directUrlPreview) {
    const localeKey = locale.toUpperCase();
    const defaultLocaleKey = fallbackLng.toUpperCase();

    const alt =
      additional[`AltText${localeKey}`] ||
      additional[`AltText${defaultLocaleKey}`] ||
      undefined;
    const baseAttributes = { url: directUrlPreview, alt, type: "image/jpeg" };

    if (width && height) {
      const aspectRatio = width / height;
      const previewSize = getPreviewSize(directUrlPreview);

      if (aspectRatio < 1) {
        return {
          ...baseAttributes,
          width: Math.round(previewSize * aspectRatio),
          height: previewSize,
        };
      } else {
        return {
          ...baseAttributes,
          width: previewSize,
          height: Math.round(previewSize * aspectRatio),
        };
      }
    }

    return baseAttributes;
  }
};
