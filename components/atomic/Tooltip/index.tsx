import { FC } from "react";
import styles from "./styles.module.css";

interface TooltipProps {
  value: string;
  isVisible: boolean;
  tooltipFormatter?: (value: string) => string;
}

const Tooltip: FC<TooltipProps> = ({ value, isVisible, tooltipFormatter }) => {
  if (isVisible) {
    return (
      <div className={styles.tooltipContainer} id="tooltipText">
        {tooltipFormatter ? tooltipFormatter(value) : value}
        <span className={styles.toolbarArrowContainer}>
          <span className={styles.tooltipArrow} aria-hidden="true"></span>
        </span>
      </div>
    );
  }
};

Tooltip.displayName = "Atomic.Tooltip";

export default Tooltip;
