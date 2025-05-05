"use client";
import { ComponentProps, forwardRef, MouseEventHandler } from "react";
import clsx from "clsx";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib/styles";
import styles from "./styles.module.css";

interface IconButtonProps {
  onClickCallback?: MouseEventHandler;
  accessibleText?: string;
  visibleText?: string;
  isBlock?: boolean;
  icon: string;
  size?: number;
  buttonProps?: ComponentProps<"button">;
  svgProps?: ComponentProps<"svg">;
  iconProps?: ComponentProps<"svg">;
  className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      accessibleText,
      visibleText,
      isBlock = false,
      icon,
      size,
      onClickCallback,
      buttonProps,
      iconProps,
      className,
    },
    ref
  ) => {
    return (
      <button
        data-cy="icon-button"
        ref={ref}
        onClick={(e) => onClickCallback && onClickCallback(e)}
        className={clsx(styles.iconButton, className)}
        data-block={isBlock}
        {...buttonProps}
      >
        {visibleText}
        {accessibleText && (
          <ScreenreaderText>{accessibleText}</ScreenreaderText>
        )}
        <IconComposer {...{ size, icon, ...iconProps }} />
      </button>
    );
  }
);

IconButton.displayName = "Atomic.IconButton";

export default IconButton;
