import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const NightCloudyHeavyRainThunder = ({ width, height }) => {
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
            fill: #dfe1e8;
          }

          .cls-2 {
            fill: #cdd0db;
          }

          .cls-3 {
            fill: #bec1cb;
          }

          .cls-4 {
            fill: #ffdb78;
          }

          .cls-5 {
            fill: #55b9f0;
          }`}
        </style>
      </defs>
      <g>
        <path
          className="cls-1"
          d="M63.42,29.05h-2.18c-.83-4.22-4.91-6.96-9.13-6.14-1.15.23-2.23.71-3.17,1.41-1.93-5.69-8.11-8.74-13.8-6.81-4.22,1.43-7.13,5.28-7.37,9.73-3.39.2-5.99,3.11-5.79,6.5.19,3.3,2.96,5.86,6.26,5.8h35.18c2.9-.04,5.22-2.42,5.18-5.31-.04-2.84-2.33-5.14-5.18-5.18Z"
        />
        <path
          className="cls-2"
          d="M77.63,34.4c-.27-5.06-3.59-9.44-8.38-11.06-6.47-2.2-13.5,1.27-15.7,7.74-1.07-.8-2.3-1.35-3.61-1.61-4.79-.94-9.44,2.18-10.38,6.98h-2.47c-3.24.04-5.85,2.65-5.89,5.89-.04,3.3,2.59,6,5.89,6.04h40.01c3.76.07,6.91-2.84,7.12-6.59.22-3.86-2.72-7.17-6.58-7.39Z"
        />
        <path
          className="cls-3"
          d="M52.92,42.38h-2.47c-.94-4.79-5.59-7.92-10.38-6.98-1.31.26-2.54.81-3.61,1.61-2.2-6.47-9.23-9.94-15.7-7.74-4.79,1.63-8.11,6.01-8.38,11.06-3.86.22-6.81,3.53-6.58,7.39.22,3.76,3.36,6.67,7.12,6.59h40.01c3.3-.04,5.93-2.75,5.89-6.04-.04-3.24-2.65-5.85-5.89-5.89Z"
        />
      </g>
      <g>
        <g>
          <g id="Group_5010" data-name="Group 5010">
            <path
              id="Path_1148036"
              data-name="Path 1148036"
              className="cls-5"
              d="M34.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-2" data-name="Group 5010">
            <path
              id="Path_1148036-2"
              data-name="Path 1148036"
              className="cls-5"
              d="M42.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-3" data-name="Group 5010">
            <path
              id="Path_1148036-3"
              data-name="Path 1148036"
              className="cls-5"
              d="M50.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-4" data-name="Group 5010">
            <path
              id="Path_1148036-4"
              data-name="Path 1148036"
              className="cls-5"
              d="M58.99,61.7l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
        <g>
          <g id="Group_5010-5" data-name="Group 5010">
            <path
              id="Path_1148036-5"
              data-name="Path 1148036"
              className="cls-5"
              d="M48.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g id="Group_5010-6" data-name="Group 5010">
            <path
              id="Path_1148036-6"
              data-name="Path 1148036"
              className="cls-5"
              d="M56.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
          <g
            id="uuid-546f6632-137d-4972-8105-b1ff60618b42"
            data-name="Group 5010-2"
          >
            <path
              id="uuid-4b3d882a-9e4a-4ca6-8fc1-22071760154b"
              data-name="Path 1148036-2"
              className="cls-5"
              d="M40.12,70.84l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
            />
          </g>
        </g>
      </g>
      <g id="Lightning">
        <path
          id="Path_1158524"
          data-name="Path 1158524"
          className="cls-4"
          d="M22.88,52.33h-3.95c.8,2.04,6.51,16.73,7.45,19.15l-.67-13.71h5.06c-.48-2.24-2.35-11.04-2.87-13.44l-5.33,1.14,1.46,6.86h-1.15Z"
        />
      </g>
      <g id="Lightning-2" data-name="Lightning">
        <path
          id="Path_1158524-2"
          data-name="Path 1158524"
          className="cls-4"
          d="M60.66,43.53h-3.95c.8,2.04,6.51,16.73,7.45,19.15l-.67-13.71h5.06c-.48-2.24-2.35-11.04-2.87-13.44l-5.33,1.14,1.46,6.86h-1.15Z"
        />
      </g>
    </svg>
  );
};

NightCloudyHeavyRainThunder.displayName = "SVG.NightCloudyHeavyRainThunder";

NightCloudyHeavyRainThunder.propTypes = svgShape;

export default NightCloudyHeavyRainThunder;
