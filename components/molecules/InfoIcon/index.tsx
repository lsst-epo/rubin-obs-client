import { useState } from "react";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import PropTypes from "prop-types";
import Tooltip from "@/components/atomic/Tooltip";

const InfoIcon = ({
  size,
  height,
  width,
  tooltipText,
  showTooltips = true,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);

  return (
    <Styled.InfoIconContainer>
      {tooltipText && showTooltips && (
        <Tooltip
          isVisible={isTooltipVisible || isClickedOpen}
          value={tooltipText}
        />
      )}
      <Styled.InfoIcon>
        <span
          onMouseEnter={() => showTooltips && setTooltipVisible(true)}
          onMouseLeave={() => showTooltips && setTooltipVisible(false)}
          onPointerUp={() => {
            setIsClickedOpen((prev) => !prev);
            setTooltipVisible(false);
          }}
          role="tooltip"
          aria-roledescription="tooltip"
          aria-label="Summit status dashboard widget tooltip"
          aria-labelledby="tooltipText"
        >
          <UniqueIconComposer
            icon="info"
            size={size}
            height={height}
            width={width}
          />
        </span>
      </Styled.InfoIcon>
    </Styled.InfoIconContainer>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipText: PropTypes.string,
  showTooltips: PropTypes.bool,
};

export default InfoIcon;
