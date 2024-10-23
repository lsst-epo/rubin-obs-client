import { fallbackLng } from "@/lib/i18n/settings";
import { resizeCantoImage, ValidCantoSizes } from "./resize";

const responsiveCanto = (previewUrl: string, width: number) => {
  const eligibleSizes: Array<ValidCantoSize | number> = ValidCantoSizes.filter(
    (size) => size < width
  );
  const srcSet = eligibleSizes.map((size) => {
    return {
      size,
      src: resizeCantoImage(previewUrl, size),
    };
  });

  const srcSize = eligibleSizes.map((size) => {
    return { size };
  });

  srcSize.push({ size: width });

  return {
    srcSet,
    srcSize,
  };
};

const getAssetMetadata = (
  metadata: CantoAdditional,
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

export const damAssetToImage = (locale: string, data: CantoAsset) => {
  if (!data) return undefined;

  const { metadata, url, width, height } = data;
  const { directUrlPreview, directUrlOriginal } = url;
  const { altText, ...assetMetadata } =
    getAssetMetadata(metadata, locale) || {};

  const { srcSet, srcSize } = responsiveCanto(
    directUrlPreview,
    parseFloat(width)
  );

  return {
    url: directUrlOriginal,
    srcSet,
    srcSize,
    width: parseFloat(width),
    height: parseFloat(height),
    altText,
    ...assetMetadata,
  };
};
