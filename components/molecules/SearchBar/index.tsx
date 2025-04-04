"use client";
import { useCallback, useRef, useState, useId, FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useOnClickOutside, useKeyDownEvent } from "@/hooks/listeners";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import useQueryParams from "@/lib/routing/useQueryParams";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const SearchBar: FC = () => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const { push } = useRouter();
  const { queryParams } = useQueryParams();
  const [searchText, setSearchText] = useState(
    queryParams?.get("search") || ""
  );

  const handleOpen = () => {
    inputRef.current?.focus();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchText("");
  };

  function handleKeyDown({ key }) {
    if (key !== "Escape") return;
    handleClose();
  }

  useKeyDownEvent(handleKeyDown);
  useOnClickOutside(ref, handleClose);

  const handleChange = useCallback((val) => {
    setSearchText(val);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = new URLSearchParams({ search: searchText });

    push(`/search?${query.toString()}`);
  };

  if (open) {
    inputRef.current?.focus();
  }

  return (
    <div ref={ref} data-cy="searchBar" className={styles.searchBar}>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleOpen}
        className={styles.toggle}
      >
        <span className="a-hidden">{t("toggle-search")}</span>
        <IconComposer icon="Search" className={styles.toggleIcon} />
      </button>
      <form
        role="search"
        action=""
        onSubmit={handleSubmit}
        className={clsx(styles.form)}
        data-expanded={open}
      >
        <label htmlFor={id} className="a-hidden">
          {t("search-site")}
        </label>
        <input
          autoComplete="off"
          className={styles.input}
          id={id}
          placeholder={t("search-placeholder")}
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
          required
          tabIndex={open ? 0 : -1}
          type="text"
          value={searchText}
        />
        <button type="submit" className="a-hidden" tabIndex={open ? 0 : -1}>
          {t("submit-search")}
        </button>
      </form>
    </div>
  );
};

SearchBar.displayName = "Molecule.SearchBar";

export default SearchBar;
