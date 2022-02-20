import PropTypes from "prop-types";
import Container from "@/layout/Container";
import { Video, Figure } from "@/components/atomic";

export default function VideoBlock({ caption, url }) {
  return (
    <Container>
      <Figure caption={caption} withBackground>
        <Video url={url} />
      </Figure>
    </Container>
  );
}

VideoBlock.displayName = "ContentBlock.Video";

VideoBlock.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.string,
};
