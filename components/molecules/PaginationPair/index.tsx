"use client";
import React, { FC } from "react";
import Pagination from "@/components/molecules/Pagination";
import { useTranslation } from "react-i18next";

// Focus control for screenreaders
type AutofocusOptions = "top" | "bottom";

interface PaginationPairProps {
  limit: number;
  offset: number;
  page: number;
  total: number;
  autofocus?: AutofocusOptions;
  ariaLabel?: string;
  children?: any;
}

/** A simple helper component for rendering two synced Pagination
 * components that may vertically bracket other components or page content.
 */
const PaginationPair: FC<PaginationPairProps> = ({
  limit,
  offset,
  page,
  total,
  autofocus,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Pagination
        limit={limit}
        page={page}
        total={total}
        offset={offset}
        autofocus={autofocus === "top"}
        ariaLabel={t("pagination.label.top")}
      />
      {children}
      <Pagination
        limit={limit}
        page={page}
        total={total}
        offset={offset}
        autofocus={autofocus === "bottom"}
        ariaLabel={t("pagination.label.bottom")}
      />
    </>
  );
};

PaginationPair.displayName = "Molecule.PaginationPair";

export default PaginationPair;
