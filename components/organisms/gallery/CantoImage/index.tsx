import { FunctionComponent } from "react";
import { ImageObject } from "schema-dts";
import Image from "@rubin-epo/epo-react-lib/Image";
import StructuredData from "@/components/atomic/StructuredData";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { damAssetToImage } from "@/lib/api/canto";
import { assetCaption } from "@/lib/api/canto/metadata";

interface CantoImageProps {
  locale: string;
  asset: CantoAssetDetailed;
}

const CantoImage: FunctionComponent<CantoImageProps> = ({ locale, asset }) => {
  const { additional: metadata, url } = asset;
  const image = damAssetToImage(locale, {
    width: asset.width,
    height: asset.height,
    metadata,
    url,
  });

  if (!image) {
    return null;
  }

  const { alt: altText, src, width, height, srcSet } = image;

  const structuredData: ImageObject = {
    "@type": "ImageObject",
    caption: assetCaption(metadata, locale),
    contentSize: asset.size,
    contentUrl: asset.url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    height: asset.height,
    width: asset.width,
  };

  return (
    <>
      <StructuredData jsonLd={structuredData} />
      <Image image={{ altText, url: src, width, height, srcSet }} />
    </>
  );
};

CantoImage.displayName = "Organism.Gallery.CantoImage";

export default CantoImage;
