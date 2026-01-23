import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayMixedShowers = ({ width, height }) => {
  const uniqueProps = {
    viewBox: "0 0 90 90",
    width: "100%",
    height: "auto",
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <defs>
        <style>
          {`
          .cls-1 {
            fill: #ffdb78;
          }

          .cls-2 {
            fill: #f5f5f5;
          }

          .cls-3 {
            fill: #55b9f0;
          }`}
        </style>
      </defs>
      <g>
        <circle
          id="Ellipse_33930"
          data-name="Ellipse 33930"
          className="cls-1"
          cx="56.31"
          cy="35.72"
          r="16.76"
        />
        <g id="Group_5008" data-name="Group 5008">
          <g id="Group_5007" data-name="Group 5007">
            <path
              id="Path_1148035"
              data-name="Path 1148035"
              className="cls-2"
              d="M64.08,46.95h-2.47c-.94-4.79-5.59-7.92-10.38-6.98-1.31.26-2.54.81-3.61,1.61-2.2-6.47-9.23-9.94-15.7-7.74-4.79,1.63-8.11,6.01-8.38,11.06-3.86.22-6.81,3.53-6.58,7.39.22,3.76,3.36,6.67,7.12,6.59h40.01c3.3-.04,5.93-2.75,5.89-6.04-.04-3.24-2.65-5.85-5.89-5.89"
            />
          </g>
        </g>
      </g>
      <g id="Group_5010" data-name="Group 5010">
        <path
          id="Path_1148036"
          data-name="Path 1148036"
          className="cls-3"
          d="M42.99,66.27l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
        />
      </g>
      <g id="Group_5010-2" data-name="Group 5010-2">
        <path
          id="Path_1148036-2"
          data-name="Path 1148036-2"
          className="cls-3"
          d="M50.99,66.27l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
        />
      </g>
    </svg>
  );
};

DayMixedShowers.displayName = "SVG.DayMixedShowers";

DayMixedShowers.propTypes = svgShape;

export default DayMixedShowers;
