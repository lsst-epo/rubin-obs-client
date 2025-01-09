import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const Filter = ({
  className,
  size = 24,
  fill = "currentColor",
  stroke = "currentColor",
}) => {
  const uniqueProps = {
    viewBox: "0 0 22 18",
    width: size,
    height: size,
    fill,
    stroke,
    className,
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <line x2="100%" transform="translate(0 2)" strokeWidth="4" />
      <line x2="100%" transform="translate(0 9)" strokeWidth="4" />
      <line x2="100%" transform="translate(0 16)" strokeWidth="4" />
    </svg>
  );
};

Filter.displayName = "SVG.Filter";

Filter.propTypes = svgShape;

export default Filter;
