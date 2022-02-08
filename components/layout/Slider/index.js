import PropTypes from "prop-types";
import { StyledSlider } from "./styles";
import Slider from "react-slick";

export default function SimpleSlider({ children }) {
  const settings = {
    dots: true,
  };
  return (
    <StyledSlider>
      <Slider {...settings}>{children}</Slider>
    </StyledSlider>
  );
}

SimpleSlider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.string,
  ]),
};
