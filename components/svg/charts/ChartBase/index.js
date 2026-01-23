import PropTypes from "prop-types";
import * as Styled from "./styles";

const ChartBase = ({ children, className, width = 900, height = 300 }) => {
  return (
    <Styled.SVG
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{
        "--aspect-ratio": `${width} / ${height}`,
        "--min-width": `${width}px`,
      }}
      role="group"
    >
      {children}
    </Styled.SVG>
  );
};

ChartBase.displayName = "Charts.Base";

ChartBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ChartBase;
