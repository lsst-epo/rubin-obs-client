import { FunctionComponent } from "react";
import { ImageObject } from "schema-dts";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { assetAlt, assetCaption } from "@/lib/api/canto/metadata";
import { resizeCantoImage } from "@/lib/api/canto/resize";
import GalleryImage from "@/components/molecules/GalleryImage";

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
    <GalleryImage
      {...{ width, height }}
      metadata={structuredData}
      alt={assetAlt(additional, locale)}
      src={resizeCantoImage(url.directUrlPreview, 2050)}
      title={asset.name}
    />
  );
};

CantoImage.displayName = "Organism.Gallery.CantoImage";

export default CantoImage;
