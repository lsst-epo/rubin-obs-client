import defaultProps from "../defaultProps";

const CloudyPartial = ({ className, size = 24, fill = "currentColor" }) => {
  const uniqueProps = {
    viewBox: "0 0 56 39.924",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Partial cloudy icon</title>
      <g transform="translate(-82 -195.047)">
        <ellipse
          cx="16.756"
          cy="16.756"
          rx="16.756"
          ry="16.756"
          transform="translate(104.488 195.047)"
          fill="#ffdb78"
        />
        <g transform="translate(82 209.264)">
          <path
            d="M47.009,13.773H44.534A8.847,8.847,0,0,0,30.542,8.4,12.378,12.378,0,0,0,6.46,11.721,7,7,0,0,0,7,25.708H47.009a5.968,5.968,0,0,0,0-11.935"
            transform="translate(0 -0.001)"
            fill="#f5f5f5"
          />
        </g>
      </g>
    </svg>
  );
};

CloudyPartial.displayName = "SVG.CloudyPartial";

export default CloudyPartial;
