import { FC } from "react";
import styles from "./styles.module.css";

interface TooltipProps {
  id: string;
  value: string;
  isRendered: boolean;
  isVisible: boolean;
  tooltipFormatter?: (value: string) => string;
}

const Tooltip: FC<TooltipProps> = ({
  id,
  value,
  isRendered,
  isVisible,
  tooltipFormatter,
}) => {
  // DELETE LATER: These were props for conditionally rendering this component one level up the component tree.
  // I moved them into this component to test whether the live region was activating at the same
  // time the component mounted, too quickly for the text to be announced by the screenreader.
  // It didn't help, but I left this here for further testing.
  const showVisually = isRendered && isVisible;

  return (
    <div
      className={styles.tooltipContainer}
      id={id}
      role="status"
      aria-live="polite"
      hidden={!showVisually}
    >
      {showVisually && (tooltipFormatter ? tooltipFormatter(value) : value)}
      <span className={styles.toolbarArrowContainer}>
        <span className={styles.tooltipArrow} aria-hidden="true"></span>
      </span>
    </div>
  );
};

Tooltip.displayName = "Atomic.Tooltip";

export default Tooltip;
