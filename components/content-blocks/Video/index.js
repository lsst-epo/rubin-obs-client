import PropTypes from "prop-types";
import { Container, Video, Figure } from "@rubin-epo/epo-react-lib";
import { useIsMounted } from "@/hooks";

export default function VideoBlock({ caption, url }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <Container>
      <Figure caption={caption} withBackground>
        <Video url={url} controls />
      </Figure>
    </Container>
  );
}

VideoBlock.displayName = "ContentBlock.Video";

VideoBlock.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.string,
};
