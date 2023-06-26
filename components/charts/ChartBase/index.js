import PropTypes from "prop-types";

const ChartBase = ({ children, className, width = 900, height = 300 }) => {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ minHeight: height, aspectRatio: `${width} / ${height}` }}
      role="group"
    >
      {children}
    </svg>
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
