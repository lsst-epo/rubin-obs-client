"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
import Container from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import Skeleton from "react-loading-skeleton";
import { FragmentType, useFragment } from "@/gql";
import { VideoBlockFragmentDoc } from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import styles from "./styles.module.css";

interface VideoBlockProps extends FragmentType<typeof VideoBlockFragmentDoc> {
  locale: string;
}

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

const VideoBlock: FC<VideoBlockProps> = (props) => {
  const { url, caption, backgroundColor } = useFragment(
    VideoBlockFragmentDoc,
    props
  );

  if (!url) return null;

  return (
    <Container
      darkMode={isDarkMode(backgroundColor)}
      bgColor={backgroundColor || undefined}
      paddingSize="medium"
    >
      <Figure caption={caption} withBackground>
        <YouTubePlayerWithLoading
          url={url}
          controls
          width="100%"
          height="100%"
        />
      </Figure>
    </Container>
  );
};

VideoBlock.displayName = "ContentBlock.Video";

export default VideoBlock;
