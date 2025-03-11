"use client";
import { FunctionComponent, useCallback } from "react";
import classNames from "classnames";
import Slideout from "@rubin-epo/epo-react-lib/Slideout";
import { isDefaultLocale } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import Hamburger from "@/components/atomic/Button/Hamburger";
import useNavigationMenu from "@/contexts/NavigationMenu";
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
  const { pinned, setPinned, open, setOpen, close, closeMenu } =
    useNavigationMenu();

  const handleOpenToggle = useCallback(() => {
    if (open) {
      setOpen(false);
      setPinned(false);
      closeMenu();
    } else {
      setOpen(true);
      setPinned(true);
    }
  }, [open, pinned]);

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
      >
        <nav className={classNames(styles.verticalNavigation, className)}>
          <ul className="c-nav-list--mobile">
            {items.map(({ id, title, uri, children }) => {
              const hasChildren = children && children.length > 0;

              return (
                <li key={id} className="c-nav-list__item">
                  {hasChildren ? (
                    <NavItemWithChildren
                      id={id}
                      title={title}
                      uri={uri}
                      childItems={children}
                      close={closeMenu}
                      theme="mobile"
                    />
                  ) : (
                    <NavItem
                      href={`${
                        isDefaultLocale(locale) ? "" : `/${locale}`
                      }/${uri}`}
                      onClick={close}
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
