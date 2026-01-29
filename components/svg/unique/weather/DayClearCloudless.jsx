import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayClearCloudless = ({ width, height }) => {
  const uniqueProps = {
    viewBox: "0 0 90 90",
    width: "100%",
    height: "auto",
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <circle
        style={{ fill: "#ffdb78" }}
        id="Sun_icon"
        data-name="Sun icon"
        cx="45"
        cy="45"
        r="22.5"
      />
    </svg>
  );
};

DayClearCloudless.displayName = "SVG.DayClearCloudless";

DayClearCloudless.propTypes = svgShape;

export default DayClearCloudless;
