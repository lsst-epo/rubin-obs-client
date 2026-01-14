import { useState } from "react";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import PropTypes from "prop-types";
import Tooltip from "@/components/charts/Tooltip";

const InfoIcon = ({ size, height, width, tooltipText }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const x = 0;
  const value = tooltipText;
  console.info("tooltipText: ", tooltipText);

  return (
    <>
      <Styled.InfoIcon>
        <g
          onMouseEnter={() => {
            console.info("onHover!");
            setTooltipVisible(true);
          }}
          onMouseLeave={() => {
            console.info("no longer hovering!");
            setTooltipVisible(false);
          }}
        >
          <UniqueIconComposer
            icon="info"
            size={size}
            height={height}
            width={width}
          />
        </g>
      </Styled.InfoIcon>
      {tooltipText && (
        <Tooltip y={100} isVisible={isTooltipVisible} {...{ x, value }} />
      )}
    </>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipText: PropTypes.string,
};

export default InfoIcon;
