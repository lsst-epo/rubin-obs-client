import PropTypes from "prop-types";
import * as Styled from "./styles";

const LineData = ({
  data = [],
  xDomain,
  xScale,
  yScale,
  ticks,
  labelledById,
}) => {
  const interval = (xDomain[1] - xDomain[0]) / (ticks - 1);

  const points = data.reduce((prev, curr, i) => {
    const nextPoint = `${prev} ${xScale(xDomain[0] + interval * i)},${yScale(
      curr
    )}`;

    return nextPoint;
  }, "");

  return <Styled.Line points={points} />;
};

LineData.displayName = "Charts.LineData";

LineData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  xDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  ticks: PropTypes.number.isRequired,
  labelledById: PropTypes.string,
};

export default LineData;
