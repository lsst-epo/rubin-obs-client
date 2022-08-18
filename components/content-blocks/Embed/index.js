import PropTypes from "prop-types";
import styled from "styled-components";
import { containerFullBleed } from "@/styles/globalStyles";
import Container from "@/layout/Container";

export default function Embed(props) {
  const {
    embedTitle,
    fullWidth,
    embed: { url },
  } = props;

  const EmbedContainer = fullWidth ? FullWidth : Container;

  return (
    <EmbedContainer>
      <HeightHack>
        <StyledEmbed
          className="iframe"
          width="100%"
          scrolling="no"
          allowtransparency="true"
          frameBorder="0"
          marginWidth="0"
          title={embedTitle}
          allowFullScreen="allowfullscreen"
          marginHeight="0"
          src={url}
        />
      </HeightHack>
    </EmbedContainer>
  );
}

const FullWidth = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
`;

const HeightHack = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow: auto;
`;

const StyledEmbed = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

Embed.displayName = "ContentBlock.Embed";

Embed.propTypes = {
  embed: PropTypes.object,
  fullWidth: PropTypes.bool,
  embedTitle: PropTypes.string,
};
