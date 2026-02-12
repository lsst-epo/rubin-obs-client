import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayOvercastRain = ({ width, height }) => {
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
            fill: #f0f0f0;
          }

          .cls-2 {
            fill: #fafafa;
          }

          .cls-3 {
            fill: #f5f5f5;
          }

          .cls-4 {
            fill: #55b9f0;
          }
          `}
        </style>
      </defs>
      <g>
        <path
          className="cls-1"
          d="M63.42,27.78h-2.18c-.83-4.22-4.91-6.96-9.13-6.14-1.15.23-2.23.71-3.17,1.41-1.93-5.69-8.11-8.74-13.8-6.81-4.22,1.43-7.13,5.28-7.37,9.73-3.39.2-5.99,3.11-5.79,6.5.19,3.3,2.96,5.86,6.26,5.8h35.18c2.9-.04,5.22-2.42,5.18-5.31-.04-2.84-2.33-5.14-5.18-5.18Z"
        />
        <path
          className="cls-2"
          d="M77.63,33.13c-.27-5.06-3.59-9.44-8.38-11.06-6.47-2.2-13.5,1.27-15.7,7.74-1.07-.8-2.3-1.35-3.61-1.61-4.79-.94-9.44,2.18-10.38,6.98h-2.47c-3.24.04-5.85,2.65-5.89,5.89-.04,3.3,2.59,6,5.89,6.04h40.01c3.76.07,6.91-2.84,7.12-6.59.22-3.86-2.72-7.17-6.58-7.39Z"
        />
        <path
          className="cls-3"
          d="M52.92,41.11h-2.47c-.94-4.79-5.59-7.92-10.38-6.98-1.31.26-2.54.81-3.61,1.61-2.2-6.47-9.23-9.94-15.7-7.74-4.79,1.63-8.11,6.01-8.38,11.06-3.86.22-6.81,3.53-6.58,7.39.22,3.76,3.36,6.67,7.12,6.59h40.01c3.3-.04,5.93-2.75,5.89-6.04-.04-3.24-2.65-5.85-5.89-5.89Z"
        />
      </g>
      <g>
        <g>
          <g id="Group_5010" data-name="Group 5010">
            <path
              id="Path_1148036"
              data-name="Path 1148036"
              className="cls-4"
              d="M35.05,60.43l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-2" data-name="Group 5010">
            <path
              id="Path_1148036-2"
              data-name="Path 1148036"
              className="cls-4"
              d="M43.05,60.43l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-3" data-name="Group 5010">
            <path
              id="Path_1148036-3"
              data-name="Path 1148036"
              className="cls-4"
              d="M51.05,60.43l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-4" data-name="Group 5010">
            <path
              id="Path_1148036-4"
              data-name="Path 1148036"
              className="cls-4"
              d="M59.05,60.43l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
        <g>
          <g id="Group_5010-5" data-name="Group 5010">
            <path
              id="Path_1148036-5"
              data-name="Path 1148036"
              className="cls-4"
              d="M48.18,69.57l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-6" data-name="Group 5010">
            <path
              id="Path_1148036-6"
              data-name="Path 1148036"
              className="cls-4"
              d="M56.18,69.57l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g
            id="uuid-3a5ab4cc-deeb-4284-8b07-bcd13bd8e2ce"
            data-name="Group 5010-2"
          >
            <path
              id="uuid-83ab12c9-b3dc-41f6-825b-f93b99aa2469"
              data-name="Path 1148036-2"
              className="cls-4"
              d="M40.18,69.57l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

DayOvercastRain.displayName = "SVG.DayOvercastRain";

DayOvercastRain.propTypes = svgShape;

export default DayOvercastRain;
