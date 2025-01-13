import { fallbackLng } from "@/lib/i18n/settings";
import { resizeCantoImage, ValidCantoSize, ValidCantoSizes } from "./resize";
import { ImageProps } from "next/image";
import { CantoImage } from "types/canto";
import { CantoAssetAdditional } from "../galleries/schema";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import { assetAlt } from "./metadata";

const responsiveCantoSrc = (
  previewUrl: string,
  originalUrl: string,
  width: number,
  height: number
) => {
  const aspectRatio = width / height;
  const isPortrait = aspectRatio < 1;
  const longestEdge = Math.max(width, height);
  const eligibleSizes = ValidCantoSizes.filter((size) => size < longestEdge);
  const srcset = eligibleSizes.map(
    (size) =>
      `${resizeCantoImage(previewUrl, size)} ${
        isPortrait ? Math.floor(size / aspectRatio) : size
      }w`
  );

  srcset.push(`${originalUrl} ${width}w`);

  const sizes = eligibleSizes.map((size) => {
    return `(max-width: ${
      isPortrait ? Math.floor(size / aspectRatio) : size
    }px): ${isPortrait ? Math.floor(size / aspectRatio) : size}px`;
  }, "");

  sizes.push(`${width}px`);

  return {
    srcSet: srcset.join(", "),
    sizes: sizes.join(", "),
  };
};

const getAssetMetadata = (
  metadata: CantoAssetAdditional,
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

export const cantoToImageShape = (
  data: CantoImage,
  size?: ValidCantoSize,
  locale?: string
): ImageShape | undefined => {
  if (!data) return undefined;

  const { metadata, url } = data;
  const { directUrlPreview, directUrlOriginal } = url;

  const width = parseInt(data.width);
  const height = parseInt(data.height);

  if (size) {
    const scale = size / Math.max(width, height);
    const src = resizeCantoImage(directUrlPreview, size);

    return {
      src,
      url: src,
      width: Math.round(width * scale),
      height: Math.round(height * scale),
      altText: assetAlt(metadata, locale),
    };
  } else {
    return {
      src: directUrlOriginal,
      url: directUrlOriginal,
      width,
      height,
      altText: assetAlt(metadata, locale),
    };
  }
};

export const cantoToImageProps = (
  data: CantoImage,
  options: { locale?: string; usePreviewUrl?: boolean } = {}
): ImageProps => {
  const { locale = fallbackLng, usePreviewUrl = false } = options;
  const { metadata, url, width, height } = data;
  const { directUrlOriginal, directUrlPreview } = url;

  const { altText: alt = "" } = getAssetMetadata(metadata, locale) || {};

  return {
    src: usePreviewUrl ? directUrlPreview : directUrlOriginal,
    alt,
    width: parseFloat(width),
    height: parseFloat(height),
  };
};
