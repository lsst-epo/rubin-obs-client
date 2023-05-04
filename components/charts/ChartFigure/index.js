import PropTypes from "prop-types";
import * as Styled from "./styles";

const ChartFigure = ({ caption, children, legend }) => {
  return (
    <Styled.Figure>
      <Styled.Caption>{caption}</Styled.Caption>
      <Styled.Content>{children}</Styled.Content>
      {legend}
    </Styled.Figure>
  );
};

ChartFigure.displayName = "Charts.Figure";

ChartFigure.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  legend: PropTypes.node,
};

export default ChartFigure;
