import PropTypes from "prop-types";
import * as Styled from "./styles";

const Tooltip = ({
  value,
  tooltipFormatter,
  x,
  y,
  height = 16,
  isVisible = false,
}) => {
  const label = tooltipFormatter ? tooltipFormatter(value) : value;
  const width = label.length * 8;
  const arrowWidth = 6;
  const xCenter = x + width / 2;

  return (
    <Styled.Tooltip
      transform={`translate(-${width / 2} -${height * 1.5})`}
      opacity={isVisible ? 1 : 0}
    >
      <Styled.TooltipBackground
        rx={4}
        width={width}
        height={height}
        {...{ x, y }}
      />
      <Styled.TooltipArrow
        points={`${xCenter - arrowWidth} ${y + height} ${
          xCenter + arrowWidth
        } ${y + height} ${xCenter} ${y + height + arrowWidth}`}
      />
      <Styled.TooltipText
        width={width}
        height={height}
        x={xCenter}
        y={y + height / 2}
      >
        {label}
      </Styled.TooltipText>
    </Styled.Tooltip>
  );
};

Tooltip.displayName = "Charts.Tooltip";

Tooltip.propTypes = {
  value: PropTypes.number.isRequired,
  tooltipFormatter: PropTypes.func,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number,
  isVisible: PropTypes.bool,
};

export default Tooltip;
