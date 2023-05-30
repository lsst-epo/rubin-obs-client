import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const Gear = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 20 20.005",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Gear icon</title>
      <path
        d="M22.849,14.5A2.574,2.574,0,0,1,24.5,12.1a10.2,10.2,0,0,0-1.234-2.974,2.608,2.608,0,0,1-1.047.224A2.568,2.568,0,0,1,19.87,5.734,10.17,10.17,0,0,0,16.9,4.5a2.571,2.571,0,0,1-4.8,0A10.2,10.2,0,0,0,9.125,5.734,2.568,2.568,0,0,1,6.776,9.349a2.523,2.523,0,0,1-1.047-.224A10.427,10.427,0,0,0,4.5,12.1a2.573,2.573,0,0,1,.005,4.8A10.2,10.2,0,0,0,5.74,19.88,2.569,2.569,0,0,1,9.13,23.271,10.261,10.261,0,0,0,12.1,24.505a2.567,2.567,0,0,1,4.792,0,10.2,10.2,0,0,0,2.974-1.234A2.572,2.572,0,0,1,23.26,19.88a10.261,10.261,0,0,0,1.234-2.974A2.586,2.586,0,0,1,22.849,14.5Zm-8.3,4.161a4.167,4.167,0,1,1,4.167-4.167A4.166,4.166,0,0,1,14.547,18.661Z"
        transform="translate(-4.5 -4.5)"
      />
    </svg>
  );
};

Gear.displayName = "SVG.Gear";

Gear.propTypes = svgShape;

export default Gear;
