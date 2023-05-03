import PropTypes from "prop-types";
import * as Styled from "./styles";

const ChartFigure = ({ caption, children }) => {
  return (
    <Styled.Figure>
      <Styled.Caption>{caption}</Styled.Caption>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Figure>
  );
};

ChartFigure.displayName = "Charts.Figure";

ChartFigure.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
};

export default ChartFigure;
