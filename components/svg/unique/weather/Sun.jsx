import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const Sun = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 46 46",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Sun icon</title>
      <ellipse cx="23" cy="23" rx="23" ry="23" fill="#ffdb78" />
    </svg>
  );
};

Sun.displayName = "SVG.Sun";

Sun.propTypes = svgShape;

export default Sun;
