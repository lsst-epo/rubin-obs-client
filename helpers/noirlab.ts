"server-only";
import { AsideImageProps } from "@/components/molecules/Aside/Image";
import { env } from "@/env";
import { addLocaleUriSegment } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import { Category, ImageMini, VideoMini } from "@/services/noirlab";
import sanitize from "sanitize-html";

/**
 * Tries to extract the first sentence from image descriptions.
 * Falls back to the parsed string
 */
export const extractDescription = (description: string | null = "") => {
  if (description === null) return "";
  if (description.length === 0) return description;

  const cleaned = sanitize(description, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const sentence = cleaned.match(/^(.*?(?<!\b\w)[.?!])\s+[A-Z0-9]/);

  return sentence ? sentence[1] : cleaned;
};

export const isRubinAsset = (categories: Array<Category>): boolean => {
  return categories.some(({ slug }) => slug === "rubin");
};

export const rewriteAssetUrl = ({
  url,
  locale,
}: {
  url: string;
  locale?: string;
}) => {
  const parts = new URL(url).pathname.replace(/\/$/, "").split("/");
  const id = parts.pop();
  const scheme = parts.pop();
  const rewrittenPath = new URL(
    addLocaleUriSegment(locale, `/gallery/collections/news-${scheme}/${id}`),
    env.NEXT_PUBLIC_BASE_URL
  );

  return rewrittenPath.toString();
};

interface AssetProps {
  title: string;
  url: string;
  image: string;
  width?: number;
  height?: number;
  locale?: string;
  currentLocale: string;
}

const mapAssetToAside = ({
  title,
  url,
  image,
  width = 1920,
  height = 1080,
  locale,
  currentLocale,
}: AssetProps): AsideImageProps => {
  return {
    title,
    image: {
      src: image,
      alt: title,
      width,
      height,
    },
    link: {
      href: rewriteAssetUrl({ url, locale }),
      prefetch: locale === currentLocale ? null : false,
    },
  };
};

const filterInvalidAssets = <T extends ImageMini | VideoMini>(
  asset: T,
  currentLocale: string
): asset is T & {
  formats: T["formats"] & {
    newsfeature: Required<NonNullable<T["formats"]["newsfeature"]>>;
  };
} => {
  if (
    currentLocale === fallbackLng &&
    asset.lang &&
    asset.lang !== currentLocale
  ) {
    return false;
  }

  if (!asset.formats.newsfeature) return false;

  return true;
};

export const imagesToAsides = (
  images: Array<ImageMini>,
  currentLocale: string
) => {
  return images
    .filter((asset) => filterInvalidAssets(asset, currentLocale))
    .map(({ title, url, width, height, lang, formats: { newsfeature } }) => {
      return mapAssetToAside({
        title,
        url,
        image: newsfeature,
        width: width || undefined,
        height: height || undefined,
        locale: lang,
        currentLocale,
      });
    });
};
export const videosToAsides = (
  videos: Array<VideoMini>,
  currentLocale: string
) => {
  return videos
    .filter((asset) => filterInvalidAssets(asset, currentLocale))
    .map(({ title, url, lang, formats: { newsfeature } }) => {
      return mapAssetToAside({
        title,
        url,
        image: newsfeature as string,
        locale: lang,
        currentLocale,
      });
    });
};
