import PropTypes from "prop-types";
import Bar from "../Bar";

const BarData = ({
  data = [],
  xDomain,
  yDomain,
  xScale,
  yScale,
  ticks,
  labelledById,
  showTooltips,
  tooltipFormatter,
}) => {
  const interval = (xDomain[1] - xDomain[0]) / (ticks - 1);

  return (
    <g role="list" aria-labelledby={labelledById}>
      {data.map((value, i) => {
        const height = yScale(yDomain[1] - value);
        const x = xScale(xDomain[0] + interval * i);
        const y = yScale(yDomain[0]);
        return (
          <Bar
            {...{ height, x, y, value, showTooltips, tooltipFormatter }}
            key={`${value}-${i}`}
          />
        );
      })}
    </g>
  );
};

BarData.displayName = "Charts.BarData";

BarData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  xDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  ticks: PropTypes.number.isRequired,
  showTooltips: PropTypes.boolean,
  tooltipFormatter: PropTypes.func,
  labelledById: PropTypes.string,
};

export default BarData;
