import PropTypes from "prop-types";
import Image from "@/atomic/Image";
import imageShape from "@/shapes/image";
import Container from "@/layout/Container";
import { Figure } from "@/components/atomic";

export default function ImageContentBlock({ image, caption }) {
  return image ? (
    <Container>
      <Figure caption={caption}>
        <Image image={image[0]} />
      </Figure>
    </Container>
  ) : null;
}

ImageContentBlock.displayName = "ContentBlock.Image";

ImageContentBlock.propTypes = {
  image: PropTypes.arrayOf(imageShape).isRequired,
  caption: PropTypes.string,
};
