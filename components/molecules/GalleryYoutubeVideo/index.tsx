"use client";
import { FC } from "react";
import { VideoObject } from "schema-dts";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import StructuredData from "@/components/atomic/StructuredData";

const YouTubePlayerWithLoading = dynamic(
  () => import("@rubin-epo/epo-react-lib/Video"),
  {
    ssr: false,
    loading: () => <Skeleton height="100%" />,
  }
);

interface GalleryYoutubeVideoProps {
  metadata?: VideoObject;
  url: string;
  width: number;
  height: number;
}

const GalleryYoutubeVideo: FC<GalleryYoutubeVideoProps> = ({
  metadata,
  url,
  width,
  height,
}) => {
  return (
    <div style={{ aspectRatio: `${width} / ${height}` }}>
      {metadata && <StructuredData jsonLd={metadata} />}
      <YouTubePlayerWithLoading {...{ width, height, url }} />
    </div>
  );
};

GalleryYoutubeVideo.displayName = "Molecule.Gallery.Video.YouTube";

export default GalleryYoutubeVideo;
