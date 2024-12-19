"use client";
import { FunctionComponent, useRef, useState } from "react";
import classNames from "classnames";
import useHeadroom from "@/contexts/Headroom";
import NavItemWithChildren from "../../NavItemWithChildren";
import NavItem from "../../NavItem";
import { fallbackLng } from "@/lib/i18n/settings";
import { isDefaultLocale } from "@/lib/i18n";
import styles from "./styles.module.scss";
import { useOnClickOutside } from "@/hooks/listeners";

interface NavigationProps {
  items: Array<InternalLinkWithChildren>;
  locale?: string;
  className?: string;
}

const NavigationHorizontal: FunctionComponent<NavigationProps> = ({
  items,
  locale = fallbackLng,
  className,
}) => {
  const ref = useRef(null);
  const [active, setActive] = useState<string | null>(null);
  const { setPinned } = useHeadroom();

  function handleToggleClick(id: string) {
    if (id === active) {
      close();
    } else {
      open(id);
    }
  }

  const open = (id: string) => {
    setActive(id);
    setPinned(true);
  };

  const close = () => {
    setActive(null);
    setPinned(false);
  };

  useOnClickOutside(ref, close);

  return (
    <nav className={classNames(styles.horizontalNavigation, className)}>
      <ul
        ref={ref}
        className={classNames("c-nav-list--desktop", styles.navigationList)}
      >
        {items.map(({ id, title, uri, children }) => {
          const hasChildren = children && children.length > 0;

          return (
            <li key={id} className={styles.navigationItem}>
              {hasChildren && (
                <NavItemWithChildren
                  id={id}
                  active={id === active}
                  title={title}
                  uri={uri}
                  childItems={children}
                  onToggleClick={handleToggleClick}
                  onEsc={close}
                  theme="desktop"
                />
              )}
              {!hasChildren && (
                <NavItem
                  href={`${isDefaultLocale(locale) ? "" : `/${locale}`}/${uri}`}
                  onClick={close}
                  title={title}
                  theme="desktop"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

NavigationHorizontal.displayName = "Organisms.Header.Navigation.Horizontal";

export default NavigationHorizontal;
