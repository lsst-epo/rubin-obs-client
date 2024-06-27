import PropTypes from "prop-types";
import styled from "styled-components";
import { containerFullBleed } from "@/styles/globalStyles";
import { Container } from "@rubin-epo/epo-react-lib";

export default function Embed({ embedTitle, fullWidth, embedCode, embedUrl }) {
  const EmbedContainer = fullWidth ? FullWidth : Container;

  return (
    <EmbedContainer>
      <HeightHack>
        {embedCode ? (
          <StyledEmbedWrapper dangerouslySetInnerHTML={{ __html: embedCode }} />
        ) : (
          <StyledEmbed
            className="iframe"
            width="100%"
            allowtransparency="true"
            frameBorder="0"
            marginWidth="0"
            title={embedTitle}
            allowFullScreen="allowfullscreen"
            marginHeight="0"
            src={embedUrl}
          />
        )}
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
  height: 100%;
  max-height: 100vh;
`;

const StyledEmbedWrapper = styled.div`
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
  }
`;

Embed.displayName = "ContentBlock.Text";

Embed.propTypes = {
  embedCode: PropTypes.string,
  embedUrl: PropTypes.string,
  fullWidth: PropTypes.bool,
  embedTitle: PropTypes.string,
};
