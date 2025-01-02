import { FunctionComponent } from "react";
import { ImageObject } from "schema-dts";
import Image from "next/image";
import StructuredData from "@/components/atomic/StructuredData";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { assetAlt, assetCaption } from "@/lib/api/canto/metadata";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import { resizeCantoImage } from "@/lib/api/canto/resize";

interface CantoImageProps {
  locale: string;
  asset: CantoAssetDetailed;
}

const CantoImage: FunctionComponent<CantoImageProps> = ({ locale, asset }) => {
  const { additional, url } = asset;

  const width = parseInt(asset.width);
  const height = parseInt(asset.height);
  const aspectRatio = width / height;
  const landscapeSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 900px`;
  const portraitSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 450px`;

  const structuredData: ImageObject = {
    "@type": "ImageObject",
    caption: assetCaption(additional, locale),
    contentSize: asset.size,
    contentUrl: url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    height: asset.width,
    width: asset.height,
    thumbnail: {
      "@type": "ImageObject",
      contentUrl: resizeCantoImage(url.directUrlPreview, 100),
    },
  };

  return (
    <>
      <StructuredData jsonLd={structuredData} />
      <Image
        {...{ width, height }}
        data-cy="canto-image"
        alt={assetAlt(additional, locale)}
        src={url.directUrlOriginal}
        sizes={aspectRatio < 1 ? portraitSizes : landscapeSizes}
        quality={85}
        priority
        title={asset.name}
      />
    </>
  );
};

CantoImage.displayName = "Organism.Gallery.CantoImage";

export default CantoImage;
