"use client";
import { FunctionComponent } from "react";
import classNames from "classnames";
import useNavigationMenu from "@/contexts/NavigationMenu";
import NavItemWithChildren from "../../NavItemWithChildren";
import NavItem from "../../NavItem";
import { fallbackLng } from "@/lib/i18n/settings";
import { isDefaultLocale } from "@/lib/i18n";
import styles from "./styles.module.scss";

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
  const { close } = useNavigationMenu();

  return (
    <nav className={classNames(styles.horizontalNavigation, className)}>
      <ul className={classNames("c-nav-list--desktop", styles.navigationList)}>
        {items.map(({ id, title, uri, children }) => {
          const hasChildren = children && children.length > 0;

          return (
            <li key={id} className={styles.navigationItem}>
              {hasChildren ? (
                <NavItemWithChildren
                  id={id}
                  title={title}
                  uri={uri}
                  childItems={children}
                  theme="desktop"
                />
              ) : (
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
