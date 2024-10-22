import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { resizeCantoImage } from "@/lib/canto/resize";

export const pickFeaturedImage = async (
  image?: any,
  cantoAsset?: CantoAsset
): Promise<OpenGraph["images"] | undefined> => {
  if (cantoAsset) {
    const resizeWidth = 800;
    const {
      width,
      height,
      url: { directUrlPreview },
    } = cantoAsset;
    const url = resizeCantoImage(directUrlPreview, resizeWidth);
    const aspectRatio = parseInt(width) / parseInt(height);

    return {
      url,
      width: resizeWidth,
      height: Math.round(resizeWidth * aspectRatio),
    };
  }

  if (image) {
    const { url, width, height, altText: alt } = image;

    return { url, width, height, alt };
  }
};
