import PropTypes from "prop-types";
import styled from "styled-components";
import Container from "@/layout/Container";
import Video from "@/components/atomic/Video";

export default function VideoBlock({ caption, url }) {
  return (
    <Container>
      <Figure>
        <Video url={url} />
        <figcaption>{caption}</figcaption>
      </Figure>
    </Container>
  );
}

const Figure = styled.figure`
  background-color: var(--neutral10);
  padding: 20px;
`;

VideoBlock.displayName = "ContentBlock.Video";

VideoBlock.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.string,
};
