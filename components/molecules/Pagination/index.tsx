"use client";
import React, { FC } from "react";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";
import useQueryParams from "@/lib/routing/useQueryParams";
import styles from "./styles.module.scss";

interface PaginationProps {
  limit: number;
  offset: number;
  page: number;
  total: number;
}

const Pagination: FC<PaginationProps> = ({
  limit,
  offset,
  page: currentPage,
  total,
}) => {
  const { t } = useTranslation();
  const { queryParams } = useQueryParams();
  const query = queryParams ? Object.fromEntries(queryParams) : {};
  const from = offset + 1;
  let to = offset + limit;
  to = to > total ? total : to;
  const numberOfPages = Math.ceil(total / limit) || 1;

  // Here is the collapsing logic for larger page numbers
  let pageArray: Array<string | number>;
  /* eslint-disable */
  if (numberOfPages > 10) {
    currentPage < 6
      ? (pageArray = new Array(8).fill(null).map((x, i) => i + 1))
      : (pageArray = new Array(8)
          .fill(null)
          .map((x, i) => currentPage - 4 + i));

    pageArray = pageArray.concat("...").concat(numberOfPages);
  } else {
    pageArray = new Array(numberOfPages).fill(null).map((x, i) => i + 1);
  }

  const prev = currentPage - 1;
  const next = currentPage < numberOfPages ? currentPage + 1 : 0;

  return (
    <div className={styles.container}>
      <nav className={styles.navDesktop} aria-label={t("pagination.label")}>
        <div>
          <Trans i18nKey="pagination.showing-range">
            Showing {{ from }} to {{ to }} of {{ length: total }}
          </Trans>
        </div>
        <div>
          <ul className={styles.paginationList}>
            {pageArray.map((page, index) => {
              return typeof page === "number" ? (
                <li key={index}>
                  <Link
                    aria-current={page === currentPage ? "page" : false}
                    href={{ query: { ...query, page } }}
                  >
                    {page}
                  </Link>
                </li>
              ) : (
                <li key={index}>{page}</li>
              );
            })}
          </ul>
        </div>
        <div>
          {prev > 0 ? (
            <Link rel="prev" href={{ query: { ...query, page: prev } }}>
              {t("pagination.previous")}
            </Link>
          ) : (
            t("pagination.previous")
          )}
          &nbsp;&nbsp;
          {next > 0 ? (
            <Link rel="next" href={{ query: { ...query, page: next } }}>
              {t("pagination.next")}
            </Link>
          ) : (
            t("pagination.next")
          )}
        </div>
      </nav>
      <nav className={styles.navMobile} aria-label={t("pagination.label")}>
        <div>
          {prev > 0 ? (
            <Link rel="prev" href={{ query: { ...query, page: prev } }}>
              &lt;&lt;
            </Link>
          ) : (
            <>&lt;&lt;</>
          )}
        </div>
        <div>
          {next > 0 ? (
            <Link rel="next" href={{ query: { ...query, page: next } }}>
              &gt;&gt;
            </Link>
          ) : (
            <>&gt;&gt;</>
          )}
        </div>
      </nav>
    </div>
  );
};

Pagination.displayName = "Molecule.Pagination";

export default Pagination;
