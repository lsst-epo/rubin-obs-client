import { FC } from "react";
import styles from "./styles.module.css";

export enum ArrowOrientation {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

interface TooltipProps {
  value: string;
  arrowOrientation: ArrowOrientation;
  isVisible: boolean;
  tooltipFormatter?: (value: string) => string;
}

const Tooltip: FC<TooltipProps> = ({
  value,
  arrowOrientation,
  isVisible,
  tooltipFormatter,
}) => {
  console.info("arrowOrientation: ", arrowOrientation);
  console.info("arrowOrientation: ", typeof arrowOrientation);

  // if (isVisible) {
  return (
    <div
      className={styles.tooltipContainer}
      data-orientation={arrowOrientation}
    >
      {tooltipFormatter ? tooltipFormatter(value) : value}
      <span className={styles.toolbarArrowContainer}>
        <span
          className={styles.tooltipArrow}
          aria-hidden="true"
          data-placement={arrowOrientation}
        ></span>
      </span>
    </div>
  );
  // }
};

Tooltip.displayName = "Atomic.Tooltip";

export default Tooltip;
