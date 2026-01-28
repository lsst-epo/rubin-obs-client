import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayMostlyCloudyRain = ({ width, height }) => {
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
            fill: #fafafa;
          }

          .cls-2 {
            fill: #ffdb78;
          }

          .cls-3 {
            fill: #f5f5f5;
          }

          .cls-4 {
            fill: #55b9f0;
          }`}
        </style>
      </defs>
      <g>
        <circle
          id="Ellipse_33930"
          data-name="Ellipse 33930"
          className="cls-2"
          cx="49.16"
          cy="30.37"
          r="16.76"
        />
        <g id="Group_5008" data-name="Group 5008">
          <g id="Group_5007" data-name="Group 5007">
            <path
              id="Path_1148035"
              data-name="Path 1148035"
              className="cls-1"
              d="M41.08,35.68h2.47c.94-4.79,5.59-7.92,10.38-6.98,1.31.26,2.54.81,3.61,1.61,2.2-6.47,9.23-9.94,15.7-7.74,4.79,1.63,8.11,6.01,8.38,11.06,3.86.22,6.81,3.53,6.58,7.39-.22,3.76-3.36,6.67-7.12,6.59h-40.01c-3.3-.04-5.93-2.75-5.89-6.04.04-3.24,2.65-5.85,5.89-5.89"
            />
          </g>
        </g>
        <g id="Group_5008-2" data-name="Group 5008">
          <g id="Group_5007-2" data-name="Group 5007">
            <path
              id="Path_1148035-2"
              data-name="Path 1148035"
              className="cls-3"
              d="M56.92,41.61h-2.47c-.94-4.79-5.59-7.92-10.38-6.98-1.31.26-2.54.81-3.61,1.61-2.2-6.47-9.23-9.94-15.7-7.74-4.79,1.63-8.11,6.01-8.38,11.06-3.86.22-6.81,3.53-6.58,7.39.22,3.76,3.36,6.67,7.12,6.59h40.01c3.3-.04,5.93-2.75,5.89-6.04-.04-3.24-2.65-5.85-5.89-5.89"
            />
          </g>
        </g>
      </g>
      <g>
        <g>
          <g id="Group_5010" data-name="Group 5010">
            <path
              id="Path_1148036"
              data-name="Path 1148036"
              className="cls-4"
              d="M34.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-2" data-name="Group 5010">
            <path
              id="Path_1148036-2"
              data-name="Path 1148036"
              className="cls-4"
              d="M42.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-3" data-name="Group 5010">
            <path
              id="Path_1148036-3"
              data-name="Path 1148036"
              className="cls-4"
              d="M50.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-4" data-name="Group 5010">
            <path
              id="Path_1148036-4"
              data-name="Path 1148036"
              className="cls-4"
              d="M58.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
        <g>
          <g id="Group_5010-5" data-name="Group 5010">
            <path
              id="Path_1148036-5"
              data-name="Path 1148036"
              className="cls-4"
              d="M48.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-6" data-name="Group 5010">
            <path
              id="Path_1148036-6"
              data-name="Path 1148036"
              className="cls-4"
              d="M56.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g
            id="uuid-8aa79e41-79d1-4a20-95fb-d8cb23356641"
            data-name="Group 5010-2"
          >
            <path
              id="uuid-b86f7f3e-b3ea-475b-9a4b-ff5a21b40bcd"
              data-name="Path 1148036-2"
              className="cls-4"
              d="M40.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

DayMostlyCloudyRain.displayName = "SVG.DayMostlyCloudyRain";

DayMostlyCloudyRain.propTypes = svgShape;

export default DayMostlyCloudyRain;
