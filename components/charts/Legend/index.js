import PropTypes from "prop-types";
import * as Styled from "./styles";

const colors = {
  line: "#f9dc86",
  bar: "#30e0e3",
};

const ChartLegend = ({ legends = [] }) => {
  return (
    <Styled.Legends>
      {legends.map(({ title, type, id, color }) => (
        <Styled.Legend key={id}>
          <Styled.LegendColor color={color || colors[type]} />
          <Styled.LegendTitle id={id}>{title}</Styled.LegendTitle>
        </Styled.Legend>
      ))}
    </Styled.Legends>
  );
};

ChartLegend.displayName = "Charts.Legend";

ChartLegend.propTypes = {
  legends: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.oneOf("line", "bar"),
      color: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

export default ChartLegend;
