import PropTypes from "prop-types";

const svgInternalShape = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stroke: PropTypes.string,
  fill: PropTypes.string,
  svgProps: PropTypes.object,
};

export default svgInternalShape;
