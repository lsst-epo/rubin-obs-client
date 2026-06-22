import { useState } from "react";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import PropTypes from "prop-types";
import Tooltip from "@/components/atomic/Tooltip";

const InfoIcon = ({
  size,
  height,
  width,
  tooltipLabel,
  tooltipText,
  showTooltips = true,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);

  return (
    <Styled.InfoIconContainer>
      <Styled.InfoIcon>
        <button
          onMouseEnter={() => showTooltips && setTooltipVisible(true)}
          onMouseLeave={() => showTooltips && setTooltipVisible(false)}
          onPointerUp={() => {
            setIsClickedOpen((prev) => !prev);
            setTooltipVisible(false);
          }}
          aria-label={tooltipLabel}
        >
          <UniqueIconComposer
            icon="info"
            size={size}
            height={height}
            width={width}
          />
        </button>
      </Styled.InfoIcon>
      <Tooltip
        isRendered={tooltipText && showTooltips}
        isVisible={isTooltipVisible || isClickedOpen}
        value={tooltipText}
      />
    </Styled.InfoIconContainer>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipLabel: PropTypes.string,
  tooltipText: PropTypes.string,
  showTooltips: PropTypes.bool,
};

export default InfoIcon;
