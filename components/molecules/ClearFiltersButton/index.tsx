"use client";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import styles from "./styles.module.css";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ClearFiltersButtonProps {
  className?: string;
  onFiltersCleared?: () => void;
}

const ClearFiltersButton: FC<ClearFiltersButtonProps> = ({
  onFiltersCleared,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const hasPage = searchParams?.has("page");
  const hasParamsToReset = hasPage
    ? searchParams && searchParams.size > 1
    : searchParams && searchParams.size > 0;

  const clearFilters = () => {
    if (pathname && hasParamsToReset) {
      router.push(pathname);

      onFiltersCleared && onFiltersCleared();
    }
  };

  return (
    <button
      onClick={clearFilters}
      className={clsx(styles.clearFilters, className)}
      data-cy="clear"
      disabled={!hasParamsToReset}
    >
      <IconComposer icon="cancel" />
      <span className={styles.text}>{t(`search-clear`)}</span>
    </button>
  );
};

ClearFiltersButton.displayName = "Molecule.ClearFiltersButton";

export default ClearFiltersButton;
