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
  arrowOrientation,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    // <Styled.InfoIconContainer>
    <>
      <Styled.InfoIcon>
        <span
          onMouseEnter={() => showTooltips && setTooltipVisible(true)}
          onMouseLeave={() => showTooltips && setTooltipVisible(false)}
        >
          <UniqueIconComposer
            icon="info"
            size={size}
            height={height}
            width={width}
          />
        </span>
      </Styled.InfoIcon>
      {showTooltips && (
        <Tooltip
          isVisible={isTooltipVisible}
          value={tooltipText}
          arrowOrientation={arrowOrientation}
        />
      )}
    </>
    // </Styled.InfoIconContainer>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipText: PropTypes.string,
  showTooltips: PropTypes.bool,
  arrowOrientation: PropTypes.string,
};

export default InfoIcon;
