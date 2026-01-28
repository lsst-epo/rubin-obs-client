import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayShowersThunderstormLikely = ({ width, height }) => {
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
            fill: #fbb363;
          }

          .cls-2 {
            fill: #f5f5f5;
          }

          .cls-3 {
            fill: #55b9f0;
          }
          `}
        </style>
      </defs>
      <path
        id="Path_1148035"
        data-name="Path 1148035"
        className="cls-2"
        d="M66.87,38.48h-2.62c-.99-5.07-5.91-8.37-10.98-7.38-1.38.27-2.69.85-3.81,1.7-2.32-6.84-9.76-10.51-16.6-8.18-5.06,1.72-8.57,6.35-8.86,11.69-4.08.25-7.18,3.76-6.93,7.84.24,3.95,3.55,7,7.5,6.94h42.29c3.48,0,6.31-2.83,6.31-6.31,0-3.48-2.82-6.31-6.31-6.31"
      />
      <g id="Group_5010" data-name="Group 5010">
        <path
          id="Path_1148036"
          data-name="Path 1148036"
          className="cls-3"
          d="M55.16,58.48l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
        />
      </g>
      <path
        id="Path_1148036-2"
        data-name="Path 1148036-2"
        className="cls-3"
        d="M39.16,58.48l-3.4-4.38-1.32,5.38c-.59,2.42.7,4.21,3.24,3.66,2.55-.54,2.99-2.7,1.47-4.67"
      />
      <path
        id="Path_1148037"
        data-name="Path 1148037"
        className="cls-1"
        d="M41.56,46.4h-4.39c.89,2.27,7.23,18.6,8.28,21.3l-.75-15.24h5.62c-.53-2.49-2.61-12.28-3.19-14.95l-5.93,1.26,1.63,7.63h-1.28Z"
      />
    </svg>
  );
};

DayShowersThunderstormLikely.displayName = "SVG.DayShowersThunderstormLikely";

DayShowersThunderstormLikely.propTypes = svgShape;

export default DayShowersThunderstormLikely;
