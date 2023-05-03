import PropTypes from "prop-types";
import * as Styled from "./styles";

const XAxis = ({
  xDomain,
  yDomain,
  xScale,
  yScale,
  padding,
  ticks,
  labelFormatter,
  labelledById,
}) => {
  const tickHeight = 5;
  const valueInterval = (xDomain[1] - xDomain[0]) / ticks;
  const positionInterval = (xDomain[1] - xDomain[0]) / (ticks - 1);
  const axisTop = yScale(yDomain[0]);

  const tickMap = Array.from(Array(ticks)).map((tick, i) => {
    const value = xDomain[0] + valueInterval * i;
    const label = labelFormatter ? labelFormatter(value) : value;
    const position = xScale(xDomain[0] + positionInterval * i);

    return { label, position };
  });

  return (
    <g role="list" aria-labelledby={labelledById}>
      <Styled.BaseLine
        x1={xScale(xDomain[0]) - padding}
        x2={xScale(xDomain[1]) + padding}
        y1={axisTop}
        y2={axisTop}
      />
      {tickMap.map(({ label, position }, i) => (
        <g role="listitem" key={`${label}-${i}`}>
          <Styled.Tick
            x1={position}
            x2={position}
            y1={axisTop}
            y2={axisTop + tickHeight}
          />
          <Styled.TickLabel x={position} y={axisTop + tickHeight * 2}>
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
  yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  padding: PropTypes.number.isRequired,
  ticks: PropTypes.number.isRequired,
  labelFormatter: PropTypes.func,
  labelledById: PropTypes.string,
};

export default XAxis;
