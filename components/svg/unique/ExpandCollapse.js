import { svgInternalShape } from "@/shapes/svg";

const ExpandToggle = ({ className, size = 31, fill, isOpen = false }) => {
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    role: "presentation",
    viewBox: "0 0 31 31",
    width: size,
    height: size,
    fill,
    className,
  };

  return (
    <svg {...svgProps}>
      <title>{isOpen ? "Collapse" : "Expand"}</title>
      <rect
        data-name="Rectangle 3703"
        width={31}
        height={31}
        rx={2}
        fill={fill}
      />
      <path
        data-name="Line 8913"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        d="M8.5 15.5h14"
      />
      <path
        data-name="Line 8914"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        d="M15.5 8.5v14"
        style={{ visibility: isOpen ? "hidden" : "visible" }}
      />
    </svg>
  );
};

export default ExpandToggle;

ExpandToggle.displayName = "SVG.ExpandToggle";

ExpandToggle.propTypes = {
  ...svgInternalShape,
};
