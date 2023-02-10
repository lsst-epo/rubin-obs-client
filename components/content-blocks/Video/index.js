import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { Video, Figure } from "@/components/atomic";
import { useIsMounted } from "@/hooks";

export default function VideoBlock({ caption, url }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

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
