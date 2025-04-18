"use client";
import { FC, FormEventHandler, useEffect, useId, useRef } from "react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import styles from "./styles.module.css";

interface SearchProps {
  className?: string;
}

const Search: FC<SearchProps> = ({ className }) => {
  const id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const searchText = searchParams?.get("search") || "";

  useEffect(() => {
    if (searchText === "") {
      formRef?.current?.reset();
    }
  }, [searchText]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const search = new FormData(event.target as HTMLFormElement).get("search");
    const params = new URLSearchParams(searchParams?.toString());

    if (search) {
      params.set("search", search.toString());

      if (params.has("page")) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params?.toString()}`);
    }

    if (search === "" && search !== searchText && searchText !== null) {
      params.delete("search");

      if (params.has("page")) {
        params.delete("page");
      }

      router.push(`${pathname}?${params?.toString()}`);
    }
  };

  const handleClear: FormEventHandler<HTMLInputElement> = (event) => {
    const { target, nativeEvent } = event;
    const { form, value } = target as HTMLInputElement;

    if (!(nativeEvent instanceof InputEvent) && value === "") {
      form?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={clsx(styles.searchFieldset, className)}
    >
      <button className={styles.searchSubmit} type="submit">
        <IconComposer size="14px" icon="search" />
        <span className="a-hidden">{t("submit-search")}</span>
      </button>
      <label htmlFor={id} className="a-hidden">
        {t("search-filter")}
      </label>
      <input
        data-cy="search"
        id={id}
        type="search"
        name="search"
        className={styles.search}
        placeholder={t("search-filter-placeholder")}
        onInput={handleClear}
        defaultValue={searchText}
      />
    </form>
  );
};

Search.displayName = "Molecule.Search";

export default Search;
