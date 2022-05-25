import PropTypes from "prop-types";
import * as Styled from "./styles";

function Wrapper({ children, className }) {
  return <Styled.Wrapper className={className}>{children}</Styled.Wrapper>;
}

Wrapper.displayName = "Carousel.Wrapper";

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Wrapper;
