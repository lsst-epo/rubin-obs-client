import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useOnClickOutside, useKeyDownEvent } from "@/hooks/listeners";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { getSiteString } from "@/lib/utils";

const INPUT_ID = "headerSearchBar";

export default function SearchBar() {
  const ref = useRef();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const site = getSiteString(query.uriSegments);
  const searchPathname = site === "es" ? "/es/search" : "/search";
  const [searchText, setSearchText] = useState(query.search || "");

  useKeyDownEvent(handleKeyDown);
  useOnClickOutside(ref, () => {
    setOpen(false);
    handleReset();
  });

  function handleKeyDown({ key }) {
    if (key !== "Escape") return;
    setOpen(false);
  }

  const handleChange = useCallback((val) => {
    setSearchText(val);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    inputRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    router.push({
      pathname: searchPathname,
      query: { search: searchText },
    });
  };

  const handleReset = () => {
    setSearchText("");
  };

  return (
    <div ref={ref} className="c-search-bar">
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleOpen}
        className="c-search-bar__toggle"
      >
        <span className="a-hidden">{t("toggle-search")}</span>
        <IconComposer icon="Search" className="c-global-header__icon" />
      </button>
      <form
        role="search"
        action=""
        onSubmit={handleSubmit}
        className={classNames({
          "c-search-bar__form": true,
          "c-search-bar__form--is-open": open,
        })}
      >
        <label htmlFor={INPUT_ID} className="a-hidden">
          {t("search-site")}
        </label>
        <input
          autoComplete="off"
          className="c-search-bar__input"
          id={INPUT_ID}
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
}

SearchBar.displayName = "Global.Header.SearchBar";
