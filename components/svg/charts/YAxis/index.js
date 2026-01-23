import PropTypes from "prop-types";
import * as Styled from "./styles";

const YAxis = ({
  xDomain,
  yDomain,
  xScale,
  yScale,
  padding,
  ticks,
  labelFormatter,
  labelledById,
  showGridLines = true,
  secondary = false,
}) => {
  const interval = (yDomain[1] - yDomain[0]) / ticks;

  const tickMap = Array.from(Array(ticks)).map((tick, i) => {
    const value = yDomain[0] + interval * (i + 1);
    const label = labelFormatter ? labelFormatter(value) : value;
    const labelPosition = secondary
      ? xScale(xDomain[1]) + padding
      : xScale(xDomain[0]) - padding;
    const position = yScale(value);

    return { label, position, labelPosition };
  });

  return (
    <g role="list" aria-labelledby={labelledById}>
      {tickMap.map(({ label, labelPosition, position }, i) => (
        <g role="listitem" key={`${label}-${i}`}>
          {showGridLines && (
            <Styled.GridLine
              x1={xScale(xDomain[0]) - padding}
              x2={xScale(xDomain[1]) + padding}
              y1={position}
              y2={position}
            />
          )}
          <Styled.GridLineLabel
            x={labelPosition}
            y={position + 5}
            textAnchor={secondary ? "end" : "start"}
          >
            {label}
          </Styled.GridLineLabel>
        </g>
      ))}
    </g>
  );
};

YAxis.displayName = "Charts.YAxis";

YAxis.propTypes = {
  xDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  padding: PropTypes.number.isRequired,
  ticks: PropTypes.number.isRequired,
  labelFormatter: PropTypes.func,
  labelledById: PropTypes.string,
  showGridLines: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default YAxis;
