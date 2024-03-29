import PropTypes from "prop-types";
import * as Styled from "./styles";

const XAxis = ({
  xDomain,
  xScale,
  y = 0,
  padding = 0,
  ticks,
  labelFormatter,
  labelledById,
}) => {
  const tickHeight = 5;

  const interval = (xDomain[1] - xDomain[0]) / ticks;

  const tickMap = Array.from(Array(ticks + 1)).map((tick, i) => {
    const value = xDomain[0] + interval * i;
    const label = labelFormatter ? labelFormatter(value, i) : value;
    const position = xScale(xDomain[0] + interval * i);

    return { label, position };
  });

  return (
    <g role="list" aria-labelledby={labelledById}>
      <Styled.BaseLine
        x1={xScale(xDomain[0]) - padding}
        x2={xScale(xDomain[1]) + padding}
        y1={y}
        y2={y}
      />
      {tickMap.map(({ label, position }, i) => (
        <g role="listitem" key={`${label}-${i}`}>
          <Styled.Tick x1={position} x2={position} y1={y} y2={y + tickHeight} />
          <Styled.TickLabel x={position} y={y + tickHeight * 3}>
            {label}
          </Styled.TickLabel>
        </g>
      ))}
    </g>
  );
};

XAxis.displayName = "Charts.XAxis";

XAxis.propTypes = {
  xDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  y: PropTypes.number,
  padding: PropTypes.number,
  ticks: PropTypes.number.isRequired,
  labelFormatter: PropTypes.func,
  labelledById: PropTypes.string,
};

export default XAxis;
