import PropTypes from "prop-types";
import { MixedLink } from "@/components/atomic/";
import { Container } from "@rubin-epo/epo-react-lib";
import { mixedLinkShape } from "@/shapes/link";

export default function LinkContentBlock({ mixedLink, url, text }) {
  return (
    <Container>
      <MixedLink
        {...mixedLink}
        url={url || mixedLink?.url}
        text={text || mixedLink?.customText || mixedLink?.text}
        className={mixedLink && "c-buttonish c-buttonish--block"}
      />
    </Container>
  );
}

LinkContentBlock.displayName = "ContentBlock.Link";

LinkContentBlock.propTypes = {
  mixedLink: mixedLinkShape,
  url: PropTypes.string,
  text: PropTypes.string,
};
