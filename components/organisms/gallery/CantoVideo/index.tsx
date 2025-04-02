import { FunctionComponent } from "react";
import { VideoObject } from "schema-dts";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { assetCaption, assetTitle } from "@/lib/api/canto/metadata";
import GalleryVideo from "@/components/molecules/GalleryVideo";

interface CantoVideoProps {
  locale: string;
  asset: CantoAssetDetailed;
  license?: string;
}

const CantoVideo: FunctionComponent<CantoVideoProps> = ({
  locale,
  asset,
  license,
}) => {
  const {
    width,
    height,
    url: { directUrlPreviewPlay, directUrlOriginal, directUrlPreview },
  } = asset;

  const structuredData: VideoObject = {
    "@type": "VideoObject",
    name: assetTitle(asset.additional, locale),
    caption: assetCaption(asset.additional, locale),
    contentSize: asset.size,
    contentUrl: asset.url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    dateCreated: asset.default.DateCreated,
    uploadDate: asset.default.DateUploaded,
    thumbnailUrl: directUrlPreviewPlay || undefined,
    height: `${width}px`,
    width: `${height}px`,
    license,
  };

  return (
    <GalleryVideo
      metadata={structuredData}
      url={directUrlPreviewPlay || directUrlOriginal}
      thumbnail={directUrlPreview}
      {...{ width, height }}
    />
  );
};

CantoVideo.displayName = "Organism.Gallery.CantoVideo";

export default CantoVideo;
