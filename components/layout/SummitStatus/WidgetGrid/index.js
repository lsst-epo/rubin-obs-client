import * as Styled from "./styles";
import PropTypes from "prop-types";

const WidgetGrid = ({ gridCount, children }) => {
  return (
    <Styled.WidgetGrid gridcount={gridCount}>{children}</Styled.WidgetGrid>
  );
};

WidgetGrid.displayName = "Layout.WidgetGrid";

WidgetGrid.propTypes = {
  children: PropTypes.node,
  gridCount: PropTypes.number,
};

export default WidgetGrid;
