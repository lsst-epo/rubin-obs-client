"server-only";
import { AsideImageProps } from "@/components/molecules/Aside/Image";
import { env } from "@/env";
import { addLocaleUriSegment } from "@/lib/i18n";
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
}

const mapAssetToAside = ({
  title,
  url,
  image,
  width = 1920,
  height = 1080,
  locale,
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
    },
  };
};

export const imagesToAsides = (images: Array<ImageMini>) => {
  return images
    .map(({ title, url, width, height, lang, formats: { newsfeature } }) => {
      return newsfeature
        ? mapAssetToAside({
            title,
            url,
            image: newsfeature,
            width: width || undefined,
            height: height || undefined,
            locale: lang,
          })
        : undefined;
    })
    .filter((aside) => !!aside);
};
export const videosToAsides = (videos: Array<VideoMini>) => {
  return videos
    .map(({ title, url, lang, formats: { newsfeature } }) => {
      return newsfeature
        ? mapAssetToAside({
            title,
            url,
            image: newsfeature,
            locale: lang,
          })
        : undefined;
    })
    .filter((aside) => !!aside);
};
