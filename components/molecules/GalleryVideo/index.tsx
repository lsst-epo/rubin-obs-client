import { FC } from "react";
import StructuredData from "@/components/atomic/StructuredData";
import { GenericPlayer as Video } from "@rubin-epo/epo-react-lib/Video";
import { VideoObject } from "schema-dts";

interface GalleryVideoProps {
  metadata?: VideoObject;
  url: string;
  thumbnail: string;
  width?: string | number;
  height?: string | number;
}

const GalleryVideo: FC<GalleryVideoProps> = ({
  metadata,
  url,
  thumbnail,
  width,
  height,
}) => {
  return (
    <>
      {metadata && <StructuredData jsonLd={metadata} />}
      <Video data-cy="gallery-video" {...{ width, height, url, thumbnail }} />
    </>
  );
};

GalleryVideo.displayName = "Molecule.Gallery.Video";

export default GalleryVideo;
