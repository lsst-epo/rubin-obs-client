import PropTypes from "prop-types";
import { useCarouselContext } from "../context";
import * as Styled from "./styles";

function Slide({ children }) {
  const { slideProps } = useCarouselContext();

  return <Styled.Slide {...slideProps}>{children}</Styled.Slide>;
}

Slide.displayName = "Carousel.Slide";

Slide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Slide;
