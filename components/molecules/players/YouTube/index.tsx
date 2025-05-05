"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.css";

const YouTubePlayerWithLoading = dynamic(
  () => import("@rubin-epo/epo-react-lib/Video"),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        containerClassName={styles.skeletonContainer}
        style={{ aspectRatio: "16 / 9" }}
        height="100%"
      />
    ),
  }
);

interface YouTubePlayerProps {
  url: string;
  className?: string;
}

const YouTubePlayer: FC<YouTubePlayerProps> = ({ url, className }) => {
  return <YouTubePlayerWithLoading {...{ url, className }} />;
};

YouTubePlayer.displayName = "Molecule.Player.YouTube";

export default YouTubePlayer;
