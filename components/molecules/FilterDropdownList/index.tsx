"use client";
import { FC, ReactNode } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
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
      <Menu.Button className={classNames(styles.toggleButton, className)}>
        {icon && <div className={styles.toggleIcon}>{icon}</div>}
        {name}
      </Menu.Button>
      <Menu.Items className={styles.filterList}>
        {includeReset && (
          <Menu.Item>
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
          </Menu.Item>
        )}
        {filters.map(({ name, query, value, active }) => {
          const isActive = active || paramsWithoutPage.has(query, value);
          return (
            <Menu.Item key={name}>
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
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

FilterDropdownList.displayName = "Molecule.FilterDropdownList";

export default FilterDropdownList;
