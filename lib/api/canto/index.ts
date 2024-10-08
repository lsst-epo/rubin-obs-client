import { fallbackLng } from "@/lib/i18n/settings";
import { resizeCantoImage, ValidCantoSizes } from "./resize";

const responsiveCantoSrc = (
  previewUrl: string,
  originalUrl: string,
  width: number
) => {
  const eligibleSizes = ValidCantoSizes.filter((size) => size < width);
  const srcset = eligibleSizes.map(
    (size) => `${resizeCantoImage(previewUrl, size)} ${size}w`
  );

  srcset.push(`${originalUrl} ${width}w`);

  const sizes = eligibleSizes.map((size) => {
    return `(max-width: ${size}px): ${size}px`;
  }, "");

  sizes.push(`${width}px`);

  return {
    srcSet: srcset.join(", "),
    sizes: sizes.join(", "),
  };
};

const getAssetMetadata = (
  metadata: Record<string, string>,
  locale = fallbackLng
): { altText?: string; caption?: string; credit?: string } | undefined => {
  if (!metadata) return undefined;

  const localeKey = locale.toUpperCase();

  const altText = metadata[`AltText${localeKey}`];
  const caption = metadata[`Caption${localeKey}`];
  const credit = metadata.Credit;

  return {
    altText: altText === null ? undefined : altText,
    caption: caption === null ? undefined : caption,
    credit: credit === null ? undefined : credit,
  };
};

export const damAssetToImage = (locale: string, data: CantoImage) => {
  if (!data) return undefined;

  const { metadata, url, width, height } = data;
  const { directUrlPreview, directUrlOriginal } = url;
  const { altText: alt, ...assetMetadata } =
    getAssetMetadata(metadata, locale) || {};

  return {
    src: directUrlPreview,
    ...responsiveCantoSrc(
      directUrlPreview,
      directUrlOriginal,
      parseFloat(width)
    ),
    width: parseFloat(width),
    height: parseFloat(height),
    alt,
    ...assetMetadata,
  };
};
