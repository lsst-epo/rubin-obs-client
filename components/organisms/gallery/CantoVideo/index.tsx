import { FunctionComponent } from "react";
import { VideoObject } from "schema-dts";
import { GenericPlayer as Video } from "@rubin-epo/epo-react-lib/Video";
import StructuredData from "@/components/atomic/StructuredData";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { assetCaption } from "@/lib/api/canto/metadata";

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
    caption: assetCaption(asset.additional, locale),
    contentSize: asset.size,
    contentUrl: asset.url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    dateCreated: asset.default.DateCreated,
    height: `${width}px`,
    width: `${height}px`,
    license,
  };

  return (
    <>
      <StructuredData jsonLd={structuredData} />
      <Video
        data-cy="canto-video"
        url={directUrlPreviewPlay || directUrlOriginal}
        thumbnail={directUrlPreview}
        {...{ width, height }}
      />
    </>
  );
};

CantoVideo.displayName = "Organism.Gallery.CantoVideo";

export default CantoVideo;
