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
  license?: string;
}

const CantoImage: FunctionComponent<CantoImageProps> = ({
  locale,
  asset,
  license,
}) => {
  const { additional, url, width, height } = asset;

  const aspectRatio = width / height;
  const landscapeSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 1435px`;
  const portraitSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 700px`;

  const structuredData: ImageObject = {
    "@type": "ImageObject",
    caption: assetCaption(additional, locale),
    contentSize: asset.size,
    contentUrl: url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    height: `${width}px`,
    width: `${height}px`,
    dateCreated: asset.default.DateCreated,
    thumbnail: {
      "@type": "ImageObject",
      contentUrl: resizeCantoImage(url.directUrlPreview, 100),
    },
    license,
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
