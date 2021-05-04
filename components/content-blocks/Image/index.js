import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "@/primitives/Image";
import imageShape from "@/shapes/image";
import Container from "@/layout/Container";

export default function ImageContentBlock({ image, caption }) {
  return image ? (
    <Container>
      <Figure>
        <Image image={image[0]} />
        <figcaption>{caption}</figcaption>
      </Figure>
    </Container>
  ) : null;
}

const Figure = styled.figure``;
ImageContentBlock.displayName = "ContentBlock.Image";

ImageContentBlock.propTypes = {
  image: PropTypes.arrayOf(imageShape).isRequired,
  caption: PropTypes.string,
};
