import { useState } from "react";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import PropTypes from "prop-types";
import Tooltip from "@/components/atomic/Tooltip";

const InfoIcon = ({
  size,
  height,
  width,
  tooltipId,
  tooltipLabel,
  tooltipText,
  showTooltips = true,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);

  return (
    // Below is the original implementation, commented out but not deleted for reference

    // <Styled.InfoIconContainer>
    //   {tooltipText && showTooltips && (
    //     <Tooltip
    //       isVisible={isTooltipVisible || isClickedOpen}
    //       value={tooltipText}
    //     />
    //   )}
    //   <Styled.InfoIcon>
    //     <span
    //       onMouseEnter={() => showTooltips && setTooltipVisible(true)}
    //       onMouseLeave={() => showTooltips && setTooltipVisible(false)}
    //       onPointerUp={() => {
    //         setIsClickedOpen((prev) => !prev);
    //         setTooltipVisible(false);
    //       }}
    //       role="tooltip"
    //       aria-roledescription="reading role description"
    //       aria-label="Summit status dashboard widget tooltip"
    //       aria-labelledby="tooltipText"
    //     >
    //       <UniqueIconComposer
    //         icon="info"
    //         size={size}
    //         height={height}
    //         width={width}
    //       />
    //     </span>
    //   </Styled.InfoIcon>
    // </Styled.InfoIconContainer>

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

      {/* DELETE LATER: I swapped the tooltip JSX under the button JSX because apparently,
          screenreaders focus ahead of where they currently are in the DOM
          to look for changes to live regions. The CSS remained fine, but
          the screenreader still does not read the tooltip text on click/
          activate. */}
      <Tooltip
        isRendered={tooltipText && showTooltips}
        isVisible={isTooltipVisible || isClickedOpen}
        id={tooltipId}
        value={tooltipText}
      />
    </Styled.InfoIconContainer>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipId: PropTypes.string,
  tooltipLabel: PropTypes.string,
  tooltipText: PropTypes.string,
  showTooltips: PropTypes.bool,
};

export default InfoIcon;
