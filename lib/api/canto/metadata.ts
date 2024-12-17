import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { fallbackLng } from "@/lib/i18n/settings";
import { getPreviewSize } from "./resize";
import { CantoAssetAdditional, CantoAssetDetailed } from "../galleries/schema";

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

export const assetToPageMetadata = (
  asset: CantoAssetDetailed,
  locale: string
): Metadata => {
  const { name: title, additional } = asset;
  const localeKey = locale.toUpperCase();
  const defaultLocaleKey = fallbackLng.toUpperCase();

  const description =
    additional[`Title${localeKey}`] ||
    additional[`Title${defaultLocaleKey}`] ||
    undefined;

  return {
    title,
    description,
    openGraph: {
      images: assetToOpenGraphImage(asset, locale),
    },
  };
};

export const assetToOpenGraphImage = (
  asset: CantoAssetDetailed,
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
      const aspectRatio = parseInt(width) / parseInt(height);
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
