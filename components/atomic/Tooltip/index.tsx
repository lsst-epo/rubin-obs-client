import { FC } from "react";
import styles from "./styles.module.css";

interface TooltipProps {
  value: string;
  isRendered: boolean;
  isVisible: boolean;
  tooltipFormatter?: (value: string) => string;
}

const Tooltip: FC<TooltipProps> = ({
  value,
  isRendered,
  isVisible,
  tooltipFormatter,
}) => {
  const showVisually = isRendered && isVisible;

  return (
    <div
      className={
        showVisually ? styles.tooltipContainer : styles.tooltipContainerHidden
      }
      role="status"
      aria-live="polite"
    >
      {showVisually && (
        <>
          {tooltipFormatter ? tooltipFormatter(value) : value}
          <span className={styles.toolbarArrowContainer}>
            <span className={styles.tooltipArrow} aria-hidden="true"></span>
          </span>
        </>
      )}
    </div>
  );
};

Tooltip.displayName = "Atomic.Tooltip";

export default Tooltip;
