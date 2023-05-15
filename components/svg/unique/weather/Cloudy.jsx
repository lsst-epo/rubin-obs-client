import defaultProps from "../defaultProps";

const Cloudy = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 52.977 31.707",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Cloudy icon</title>
      <g transform="translate(-82 -197.264)">
        <g transform="translate(92.823 197.264)">
          <path
            d="M37.406,10.959h-1.97A7.04,7.04,0,0,0,24.3,6.684,9.849,9.849,0,0,0,5.14,9.327a5.573,5.573,0,0,0,.433,11.129H37.406a4.748,4.748,0,0,0,0-9.5"
            fill="#dce0e3"
          />
        </g>
        <g transform="translate(82 203.264)">
          <path
            d="M47.009,13.773H44.534A8.847,8.847,0,0,0,30.542,8.4,12.378,12.378,0,0,0,6.46,11.721,7,7,0,0,0,7,25.708H47.009a5.968,5.968,0,0,0,0-11.935"
            fill="#f5f5f5"
          />
        </g>
      </g>
    </svg>
  );
};

Cloudy.displayName = "SVG.Cloudy";

export default Cloudy;
