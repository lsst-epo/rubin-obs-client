/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/*
 * Ignore false positives (key event exists on Navigation component; role attribute not needed
 * since Link component validly handles href and window history, click just closes subnav)
 */
import PropTypes from "prop-types";
import Link from "next/link";
import clsx from "clsx";
import internalLinkShape from "@/shapes/link";
import NavItemWithChildren from "./NavItemWithChildren";
import useNavigationMenu from "@/contexts/NavigationMenu";

export default function Subnavigation({
  items,
  active,
  theme,
  baseClassName = "c-subnav-list",
  level = 3,
}) {
  const { activeSubmenu, closeMenu, close } = useNavigationMenu();

  return (
    <ul
      className={clsx({
        [baseClassName]: true,
        [`${baseClassName}--is-active`]: active,
      })}
    >
      {items.map(({ id, title, uri, children }) => {
        const hasChildren = children && children.length > 0;
        const isActiveSub = activeSubmenu.has(id);

        if (!uri && !hasChildren) return null;

        return (
          <li key={id} className={`${baseClassName}__item`}>
            {hasChildren ? (
              <NavItemWithChildren
                id={id}
                active={active && isActiveSub}
                title={title}
                uri={uri}
                childItems={children}
                onEsc={() => closeMenu(id)}
                theme={theme}
                baseClassName="c-sub-subnav-list"
                level={level}
                parentActive={active}
              />
            ) : (
              <Link
                href={`/${uri}`}
                className={`${baseClassName}__link`}
                tabIndex={active ? 0 : -1}
                onClick={close}
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
  theme: PropTypes.oneOf(["desktop", "mobile"]),
  baseClassName: PropTypes.string,
  level: PropTypes.number,
};
