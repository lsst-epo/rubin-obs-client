import PropTypes from "prop-types";
import { useCarouselContext } from "../context";
import * as Styled from "./styles";

function Carousel({ children }) {
  const { carouselProps } = useCarouselContext();

  return <Styled.Carousel {...carouselProps}>{children}</Styled.Carousel>;
}

Carousel.displayName = "Carousel.Carousel";

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
