import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const Arrow = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 20.896 22.94",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Arrow icon</title>
      <path
        d="M9.2,0V18.153l-7.43-7.43L0,12.492,10.448,22.94,20.9,12.492l-1.767-1.768L11.7,18.153V0Z"
        transform="translate(20.896 22.94) rotate(180)"
      />
    </svg>
  );
};

Arrow.displayName = "SVG.Arrow";

Arrow.propTypes = svgShape;

export default Arrow;
