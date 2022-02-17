import PropTypes from "prop-types";
import * as Styled from "./styles";

function Wrapper({ children }) {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
}

Wrapper.displayName = "Carousel.Wrapper";

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
