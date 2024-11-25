/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/*
 * Ignore false positives (key event exists on Navigation component; role attribute not needed
 * since Link component validly handles href and window history, click just closes subnav)
 */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import classNames from "classnames";
import internalLinkShape from "@/shapes/link";
import NavItemWithChildren from "./NavItemWithChildren";

export default function Subnavigation({
  items,
  active,
  onClick,
  theme,
  baseClassName = "c-subnav-list",
  level = 2,
}) {
  const [activeSub, setActiveSub] = useState(null);

  useEffect(() => {
    if (!active) setActiveSub(null);
  }, [active]);

  function handleToggleClick(id) {
    setActiveSub((prevActive) => (prevActive === id ? null : id));
  }

  return (
    <ul
      className={classNames({
        [baseClassName]: true,
        [`${baseClassName}--is-active`]: active,
      })}
    >
      {items.map(({ id, title, uri, children }) => {
        const hasChildren = children && children.length > 0;
        const isActiveSub = id === activeSub;

        return (
          <li key={id} className={`${baseClassName}__item`}>
            {hasChildren && (
              <NavItemWithChildren
                id={id}
                active={active && isActiveSub}
                title={title}
                uri={uri}
                childItems={children}
                onToggleClick={handleToggleClick}
                onEsc={() => setActiveSub(null)}
                theme={theme}
                baseClassName="c-sub-subnav-list"
                level={3}
                parentActive={active}
              />
            )}
            {!hasChildren && (
              <Link
                prefetch={false}
                href={`/${uri}`}
                className={`${baseClassName}__link`}
                tabIndex={active ? 0 : -1}
                onClick={onClick}
              >
                {title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Subnavigation.displayName = "Header.Navigation.Subnavigation";

Subnavigation.propTypes = {
  items: PropTypes.arrayOf(internalLinkShape),
  active: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.oneOf(["desktop", "mobile"]),
  baseClassName: PropTypes.string,
  level: PropTypes.number,
};
