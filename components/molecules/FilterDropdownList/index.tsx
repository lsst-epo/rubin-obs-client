"use client";
import { FC, ReactNode } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import styles from "./styles.module.css";

export interface Filter {
  name: string;
  query: string;
  value: string;
  active?: boolean;
}

interface FilterDropdownListProps {
  icon?: ReactNode;
  name: string;
  className?: string;
  filters: Array<Filter>;
  includeReset?: boolean;
}

const FilterDropdownList: FC<FilterDropdownListProps> = ({
  name,
  icon,
  filters = [],
  includeReset = true,
  className,
}) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const paramsWithoutPage = new URLSearchParams(searchParams || {});
  const dropdownParams = [...new Set(filters.map(({ query }) => query))];

  paramsWithoutPage.delete("page");

  const params = Object.fromEntries(paramsWithoutPage);

  const resetParams = new URLSearchParams(paramsWithoutPage);
  const resetActive = !dropdownParams.some((param) => {
    const value = paramsWithoutPage.get(param);

    return value && value.length > 0;
  });

  filters.forEach(({ query }) => {
    if (resetParams.has(query)) {
      resetParams.set(query, "");
    }
  });

  return (
    <Menu as="div" className={styles.toggleWrapper}>
      <MenuButton className={clsx(styles.toggleButton, className)}>
        {icon && <div className={styles.toggleIcon}>{icon}</div>}
        {name}
      </MenuButton>
      <MenuItems className={styles.filterList}>
        {includeReset && (
          <MenuItem>
            <Link
              className={styles.filterLink}
              href={{ query: resetParams.toString() }}
            >
              {resetActive ? (
                <IconComposer size="1em" icon="checkmark" />
              ) : (
                <span />
              )}
              {t("filters.all")}
            </Link>
          </MenuItem>
        )}
        {filters.map(({ name, query, value, active }) => {
          const isActive = active || paramsWithoutPage.has(query, value);
          return (
            <MenuItem key={name}>
              <Link
                className={styles.filterLink}
                aria-current={isActive ? "page" : undefined}
                href={{ query: { ...params, [query]: value } }}
              >
                {isActive ? (
                  <IconComposer size="1em" icon="checkmark" />
                ) : (
                  <span />
                )}
                {name}
              </Link>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

FilterDropdownList.displayName = "Molecule.FilterDropdownList";

export default FilterDropdownList;
