import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const TelescopeFootprint = (width = "auto", height = "100%") => {
  const uniqueProps = {
    height,
    width,
    viewBox: "0 0 80 80",
  };
  const mergedSvgProps = { ...defaultProps, ...uniqueProps };

  return (
    <svg {...mergedSvgProps}>
      <g id="Path_10">
        <path
          style={{ fill: "none" }}
          d="M16,0v5.3h-5.3v5.3h-5.3v5.3H0v21.3H0v5.3H0v21.3h5.3v5.3h5.3v5.3h5.3v5.3h48v-5.3h5.3v-5.3h5.3v-5.3h5.3V16h-5.3v-5.3h-5.3v-5.3h-5.3V0H16Z"
        />
        <path
          style={{ fill: "#30e0e3" }}
          d="M18,2v5.3h-5.3v5.3h-5.3v5.3H2v44h5.3v5.3h5.3v5.3h5.3v5.3h44v-5.3h5.3v-5.3h5.3v-5.3h5.3V18h-5.3v-5.3h-5.3v-5.3h-5.3V2H18M16,0h48v5.3h5.3v5.3h5.3v5.3h5.3v48h-5.3v5.3h-5.3v5.3h-5.3v5.3H16v-5.3h-5.3v-5.3h-5.3v-5.3H0V16h5.3v-5.3h5.3v-5.3h5.3V0Z"
        />
      </g>
    </svg>
  );
};

TelescopeFootprint.displayName = "SVG.TelescopeFootprint";
TelescopeFootprint.propTypes = svgShape;

export default TelescopeFootprint;
