import PropTypes from "prop-types";
import * as Styled from "./styles";
import Tooltip from "../Tooltip";
import { useState } from "react";

/**
 * Individual bar with an accompanying tooltip.
 */
const Bar = ({
  height = 0,
  width = 8,
  x,
  y,
  value,
  showTooltips = true,
  tooltipFormatter,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <g
      role="listitem"
      onMouseEnter={() => showTooltips && setTooltipVisible(true)}
      onMouseLeave={() => showTooltips && setTooltipVisible(false)}
    >
      <Styled.Bar
        {...{ width, height, x, y }}
        transform={`translate(-${width / 2} -${height})`}
      />
      {showTooltips && (
        <Tooltip
          y={y - height}
          isVisible={isTooltipVisible}
          {...{ x, value, tooltipFormatter }}
        />
      )}
    </g>
  );
};

Bar.displayName = "Charts.Bar";

Bar.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  value: PropTypes.number,
  tooltipFormatter: PropTypes.func,
  showTooltips: PropTypes.bool,
};

export default Bar;
