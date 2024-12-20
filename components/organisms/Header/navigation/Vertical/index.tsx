"use client";
import { FunctionComponent, useState } from "react";
import classNames from "classnames";
import Slideout from "@rubin-epo/epo-react-lib/Slideout";
import { isDefaultLocale } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import Hamburger from "@/components/atomic/Button/Hamburger";
import useHeadroom from "@/contexts/Headroom";
import NavItemWithChildren from "../../NavItemWithChildren";
import NavItem from "../../NavItem";
import styles from "./styles.module.scss";

interface NavigationProps {
  items: Array<InternalLinkWithChildren>;
  locale?: string;
  className?: string;
}

const NavigationVertical: FunctionComponent<NavigationProps> = ({
  items,
  locale = fallbackLng,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { pinned, setPinned } = useHeadroom();

  const handleOpenToggle = () => {
    if (open) {
      setOpen(false);
      setPinned(false);
    } else {
      setOpen(true);
      setPinned(true);
    }
  };

  function handleToggleClick(id: string) {
    if (active === id) {
      setActive(null);
    } else {
      setPinned(true);
      setActive(id);
    }
  }

  return (
    <>
      <Hamburger
        active={open}
        onClick={handleOpenToggle}
        className={styles.icon}
      />
      <Slideout
        className={styles.slideOut}
        isOpen={open}
        showBackground={false}
        slideFrom="right"
        onCloseCallback={() => setActive(null)}
      >
        <nav className={classNames(styles.verticalNavigation, className)}>
          <ul className="c-nav-list--mobile">
            {items.map(({ id, title, uri, children }) => {
              const hasChildren = children && children.length > 0;

              return (
                <li key={id} className="c-nav-list__item">
                  {hasChildren && (
                    <NavItemWithChildren
                      id={id}
                      active={open && id === active}
                      title={title}
                      uri={uri}
                      childItems={children}
                      onToggleClick={handleToggleClick}
                      onEsc={() => setActive(null)}
                      theme="mobile"
                    />
                  )}
                  {!hasChildren && (
                    <NavItem
                      href={`${
                        isDefaultLocale(locale) ? "" : `/${locale}`
                      }/${uri}`}
                      onClick={() => setActive(null)}
                      title={title}
                      theme="mobile"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </Slideout>
    </>
  );
};

NavigationVertical.displayName = "Organisms.Header.Navigation.Vertical";

export default NavigationVertical;
