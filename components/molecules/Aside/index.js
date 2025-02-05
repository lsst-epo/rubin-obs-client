import PropTypes from "prop-types";
import * as Styled from "./styles";

const Aside = ({ children }) => {
  return <Styled.Aside>{children}</Styled.Aside>;
};

Aside.displayName = "Page.Aside";

Aside.propTypes = {
  children: PropTypes.node,
};

export default Aside;
