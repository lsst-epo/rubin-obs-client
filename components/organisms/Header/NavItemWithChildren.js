"use client";
import { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Subnavigation from "./Subnavigation";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useKeyDownEvent, useFocusTrap } from "@/hooks";
import internalLinkShape, { internalLinkInternalShape } from "@/shapes/link";
import useNavigationMenu from "@/contexts/NavigationMenu";

export default function NavItemWithChildren({
  id,
  parentActive,
  title,
  uri,
  childItems,
  theme,
  baseClassName = "c-nav-list",
  level = 2,
}) {
  const { activeSubmenu, closeMenu, openMenu, close } = useNavigationMenu();
  const isActive = activeSubmenu.has(id);
  const ref = useRef(null);

  useFocusTrap(ref, isActive);
  useKeyDownEvent(handleKeyDown);

  function handleKeyDown({ key }) {
    if (!isActive || key !== "Escape") return;
    close();
  }

  const handleToggle = () => {
    if (isActive) {
      closeMenu(level < 3 ? undefined : id);
    } else {
      openMenu(id, level < 3);
    }
  };

  const parent = { id, title, uri };
  const childrenWithParent = [parent].concat(childItems);

  return (
    <div ref={ref} className={`${baseClassName}__item-inner`}>
      <button
        onClick={handleToggle}
        aria-expanded={isActive}
        aria-haspopup
        className={classNames({
          [`${baseClassName}__link`]: true,
          [`${baseClassName}__link--is-active`]: isActive,
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
        active={level === 3 ? parentActive && isActive : isActive}
        onClick={close}
        theme={theme}
        level={level + 1}
        baseClassName={level === 3 ? baseClassName : "c-subnav-list"}
      />
    </div>
  );
}

NavItemWithChildren.displayName =
  "Global.Header.Navigation.NavItemWithChildren";

NavItemWithChildren.propTypes = {
  ...internalLinkInternalShape,
  parentActive: PropTypes.bool,
  childItems: PropTypes.arrayOf(internalLinkShape),
  close: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["desktop", "mobile"]),
  baseClassName: PropTypes.string,
  level: PropTypes.number,
};
