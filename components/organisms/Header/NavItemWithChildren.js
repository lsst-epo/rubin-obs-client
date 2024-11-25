"use client";
import { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Subnavigation from "./Subnavigation";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useKeyDownEvent, useFocusTrap } from "@/hooks";
import internalLinkShape, { internalLinkInternalShape } from "@/shapes/link";

export default function NavItemWithChildren({
  id,
  active,
  parentActive,
  title,
  uri,
  childItems,
  onToggleClick,
  onEsc,
  theme,
  baseClassName = "c-nav-list",
  level = 2,
}) {
  const ref = useRef(null);

  useFocusTrap(ref, active);
  useKeyDownEvent(handleKeyDown);

  function handleKeyDown({ key }) {
    if (!active || key !== "Escape") return;
    onEsc();
  }

  const parent = { id, title, uri };
  const childrenWithParent = [parent].concat(childItems);

  return (
    <div ref={ref} className={`${baseClassName}__item-inner`}>
      <button
        onClick={() => onToggleClick(id)}
        aria-expanded={active}
        aria-haspopup
        className={classNames({
          [`${baseClassName}__link`]: true,
          [`${baseClassName}__link--is-active`]: active,
          [`${baseClassName}__link--${theme}`]: !!theme,
        })}
      >
        <IconComposer
          icon="ChevronThin"
          className={`${baseClassName}__link-icon`}
        />
        <span className={`${baseClassName}__link-text`}>{title}</span>
      </button>
      <Subnavigation
        items={childrenWithParent}
        active={level === 3 ? parentActive && active : active}
        onClick={onEsc}
        theme={theme}
        level={3}
        baseClassName={level === 3 ? baseClassName : "c-subnav-list"}
      />
    </div>
  );
}

NavItemWithChildren.displayName =
  "Global.Header.Navigation.NavItemWithChildren";

NavItemWithChildren.propTypes = {
  ...internalLinkInternalShape,
  active: PropTypes.bool,
  parentActive: PropTypes.bool,
  childItems: PropTypes.arrayOf(internalLinkShape),
  onToggleClick: PropTypes.func.isRequired,
  onEsc: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["desktop", "mobile"]),
  baseClassName: PropTypes.string,
  level: PropTypes.number,
};
