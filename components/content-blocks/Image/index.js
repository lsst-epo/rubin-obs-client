import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import { Container, Figure, Image } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

export default function ImageContentBlock({ image, caption, floatDirection }) {
  return image ? (
    <Styled.Container
      as={
        floatDirection === "right" || floatDirection === "left"
          ? "section"
          : Container
      }
      $floatDirection={floatDirection}
    >
      <Figure caption={caption}>
        <Image image={image[0]} />
      </Figure>
    </Styled.Container>
  ) : null;
}

ImageContentBlock.displayName = "ContentBlock.Image";

ImageContentBlock.propTypes = {
  image: PropTypes.arrayOf(imageShape).isRequired,
  caption: PropTypes.string,
  floatDirection: PropTypes.string,
};
