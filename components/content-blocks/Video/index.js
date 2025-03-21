"use client";
import PropTypes from "prop-types";
import { Container, Video, Figure } from "@rubin-epo/epo-react-lib";
import { useIsMounted } from "@/hooks";

export default function VideoBlock({ caption, url }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <Container paddingSize="medium">
      <Figure caption={caption} withBackground>
        <Video url={url} controls width="100%" height="100%" />
      </Figure>
    </Container>
  );
}

VideoBlock.displayName = "ContentBlock.Video";

VideoBlock.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.string,
};
