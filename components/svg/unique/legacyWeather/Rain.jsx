import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const Rain = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 56 39.317",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Rain icon</title>
      <g transform="translate(-82 -267)">
        <g transform="translate(82 267)">
          <path
            d="M49.692,14.558H47.075a9.352,9.352,0,0,0-14.79-5.68A13.085,13.085,0,0,0,6.829,12.39,7.4,7.4,0,0,0,7.4,27.175H49.692a6.308,6.308,0,0,0,0-12.616"
            fill="#f5f5f5"
          />
        </g>
        <g transform="translate(107.135 297.174)">
          <path
            d="M4.853,4.378,1.458,0,.142,5.381C-.449,7.8.838,9.588,3.385,9.046s2.993-2.7,1.468-4.668"
            fill="#55b9f0"
          />
        </g>
        <g transform="translate(115.135 297.174)">
          <path
            d="M4.853,4.378,1.458,0,.142,5.381C-.449,7.8.838,9.588,3.385,9.046s2.993-2.7,1.468-4.668"
            fill="#55b9f0"
          />
        </g>
        <g transform="translate(99.135 297.174)">
          <path
            d="M4.853,4.378,1.458,0,.142,5.381C-.449,7.8.838,9.588,3.385,9.046s2.993-2.7,1.468-4.668"
            fill="#55b9f0"
          />
        </g>
      </g>
    </svg>
  );
};

Rain.displayName = "SVG.Rain";

Rain.propTypes = svgShape;

export default Rain;
