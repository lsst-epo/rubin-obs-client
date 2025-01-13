import { fallbackLng } from "@/lib/i18n/settings";
import { resizeCantoImage, ValidCantoSizes } from "./resize";
import { ImageProps } from "next/image";
import { CantoImage } from "types/canto";
import { CantoAssetAdditional, CantoAssetMetadata } from "../galleries/schema";
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
      parseInt(width),
      parseInt(height)
    ),
    width: parseInt(width),
    height: parseInt(height),
    alt,
    ...assetMetadata,
  };
};

export const damAssetToGalleryTile = (
  data: CantoAssetMetadata,
  locale: string
) => {
  const {
    additional,
    url: { directUrlPreview },
  } = data;

  const aspectRatio = parseInt(data.width) / parseInt(data.height);
  const isPortrait = aspectRatio < 1;
  const size = 640;
  const width = isPortrait ? Math.floor(size / aspectRatio) : size;
  const height = isPortrait ? size : Math.floor(size / aspectRatio);

  const { srcSet } = responsiveCantoSrc(
    directUrlPreview,
    directUrlPreview,
    width,
    height
  );

  return {
    width: isPortrait ? size : Math.floor(size * aspectRatio),
    height: isPortrait ? Math.floor(size * aspectRatio) : size,
    alt: assetAlt(additional),
    url: directUrlPreview,
    src: directUrlPreview,
    srcSet,
  };
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
