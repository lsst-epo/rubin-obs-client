"use client";
import { FC } from "react";
import Link from "next/link";
import pick from "lodash/pick";
import { GalleryDataFilters } from "@/lib/api/galleries/schema";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";

interface FilteredResultsProps {
  total?: number;
  filters: GalleryDataFilters;
}

const hasAppliedFilters = ({
  search,
  tag,
  type,
}: GalleryDataFilters): boolean => {
  if (search && search !== "") return true;
  if (tag && tag.length > 0) return true;
  if (type && type.length > 0) return true;

  return false;
};

const FilteredResults: FC<FilteredResultsProps> = ({ total, filters }) => {
  const searchParams = useSearchParams();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  if (!hasAppliedFilters(filters)) {
    return null;
  }

  const buildTag = (key: string, value: string) => {
    const paramsWithoutTag = new URLSearchParams(searchParams || {});

    let displayValue = value;

    if (paramsWithoutTag.size > 1) {
      paramsWithoutTag.delete(key, value);
    } else {
      paramsWithoutTag.set(key, "");
    }

    switch (key) {
      case "tag":
        displayValue = `#${value}`;
        break;
      case "search":
        displayValue = t("gallery.filters.search", { value });
        break;
      case "type":
        displayValue = t("gallery.filters.type", {
          type: t(`gallery.${value}_other`).toLocaleLowerCase(language),
        });
        break;
    }

    return { key, value: displayValue, query: paramsWithoutTag.toString() };
  };

  const displayFilters = pick(filters, ["search", "tag", "type"]);
  const applied: Array<ReturnType<typeof buildTag>> = [];

  Object.entries(displayFilters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((subValue) => {
        applied.push(buildTag(key, subValue));
      });
    } else {
      applied.push(buildTag(key, value));
    }
  });

  return (
    <div className={styles.filteredResults}>
      {typeof total === "number" &&
        t("gallery.filters.results", { count: total, total })}
      <ul className={styles.badgeList}>
        {applied.map(({ key, value, query }, i) => {
          return (
            <li key={`${key}-${i}`}>
              <Link className={styles.badge} href={{ query }}>
                {value}
                <IconComposer size="0.75em" icon="cancel" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FilteredResults.displayName = "Organism.Gallery.FilteredResults";

export default FilteredResults;
