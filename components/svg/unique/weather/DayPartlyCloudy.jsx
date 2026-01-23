import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const DayPartlyCloudy = ({ width, height }) => {
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
          `}
        </style>
      </defs>
      <circle
        id="Ellipse_33930"
        data-name="Ellipse 33930"
        className="cls-2"
        cx="45.16"
        cy="41.79"
        r="16.76"
      />
      <g id="Group_5008" data-name="Group 5008">
        <g id="Group_5007" data-name="Group 5007">
          <path
            id="Path_1148035"
            data-name="Path 1148035"
            className="cls-1"
            d="M37.08,47.1h2.47c.94-4.79,5.59-7.92,10.38-6.98,1.31.26,2.54.81,3.61,1.61,2.2-6.47,9.23-9.94,15.7-7.74,4.79,1.63,8.11,6.01,8.38,11.06,3.86.22,6.81,3.53,6.58,7.39-.22,3.76-3.36,6.67-7.12,6.59h-40.01c-3.3-.04-5.93-2.75-5.89-6.04.04-3.24,2.65-5.85,5.89-5.89"
          />
        </g>
      </g>
      <g id="Group_5008-2" data-name="Group 5008">
        <g id="Group_5007-2" data-name="Group 5007">
          <path
            id="Path_1148035-2"
            data-name="Path 1148035"
            className="cls-3"
            d="M52.92,53.03h-2.47c-.94-4.79-5.59-7.92-10.38-6.98-1.31.26-2.54.81-3.61,1.61-2.2-6.47-9.23-9.94-15.7-7.74-4.79,1.63-8.11,6.01-8.38,11.06-3.86.22-6.81,3.53-6.58,7.39.22,3.76,3.36,6.67,7.12,6.59h40.01c3.3-.04,5.93-2.75,5.89-6.04-.04-3.24-2.65-5.85-5.89-5.89"
          />
        </g>
      </g>
    </svg>
  );
};

DayPartlyCloudy.displayName = "SVG.DayPartlyCloudy";

DayPartlyCloudy.propTypes = svgShape;

export default DayPartlyCloudy;
