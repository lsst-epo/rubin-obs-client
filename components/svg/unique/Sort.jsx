import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const Sort = ({
  className,
  size = 24,
  fill = "currentColor",
  stroke = "currentColor",
}) => {
  const uniqueProps = {
    viewBox: "0 0 22 18.15",
    width: size,
    height: size,
    fill,
    stroke,
    className,
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <g transform="translate(23259.641 24867)">
        <line
          x2="22.281"
          transform="translate(-23259.641 -24865)"
          strokeWidth="4"
        />
        <line
          x2="17.824"
          transform="translate(-23257.412 -24858)"
          strokeWidth="4"
        />
        <line
          x2="10"
          transform="translate(-23253.412 -24850.5)"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

Sort.displayName = "SVG.Sort";

Sort.propTypes = svgShape;

export default Sort;
