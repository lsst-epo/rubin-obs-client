import PropTypes from "prop-types";
import * as Styled from "./styles";
import WidgetBackground from "@/components/atomic/WidgetBackground";

const ChartFigure = ({ caption, children, legend, className }) => {
  return (
    <WidgetBackground as="figure" {...{ className }}>
      {caption && <Styled.Caption>{caption}</Styled.Caption>}
      <Styled.Content>{children}</Styled.Content>
      {legend}
    </WidgetBackground>
  );
};

ChartFigure.displayName = "Charts.Figure";

ChartFigure.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  legend: PropTypes.node,
  className: PropTypes.string,
};

export default ChartFigure;
