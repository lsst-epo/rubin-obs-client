import PropTypes from "prop-types";
import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { MixedLink, IconComposer } from "@rubin-epo/epo-react-lib";
import T from "@/page/Translate";
import { useOnClickOutside } from "@/hooks/listeners";
import {
  usePathData,
  normalizePathData,
  getCategoryGroup,
  useGlobalData,
} from "@/lib/utils";
import withLiveRegionChange from "@/hoc/withLiveRegionChange";
import * as Styled from "./styles";

const FilterBar = ({ filterType, setLiveRegionMessage }) => {
  const { t } = useTranslation();
  const ref = useRef();
  const { asPath, query } = usePathData();
  const { pathname, pathParams } = normalizePathData(asPath);
  delete query.uriSegments;
  const { categories } = useGlobalData();
  const filterMap = {
    events: "eventFilters",
    galleryItems: "galleryTypes",
    jobs: "jobTypes",
    news: "newsFilters",
    staffProfiles: "staffFilters",
    search: "searchFilters",
  };
  const filterItems = getCategoryGroup(categories, filterMap[filterType]);
  const sortItems = getCategoryGroup(categories, "sortOptions");
  const router = useRouter();
  const [searchText, setSearchText] = useState(query.search || "");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useOnClickOutside(ref, () => {
    setFilterOpen(false);
    setSortOpen(false);
  });

  const handleFilter = () => {
    setSortOpen(false);
    setFilterOpen(!filterOpen);
  };

  const handleSort = () => {
    setFilterOpen(false);
    setSortOpen(!sortOpen);
  };

  const handleChange = useCallback((val) => {
    setSearchText(val);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname,
      query: { ...pathParams, page: 1, search: searchText },
    });
  };

  const handleReset = () => {
    setSearchText("");
    setLiveRegionMessage("Search cleared.");
    router.push(pathname);
  };

  return (
    <Styled.FilterNav ref={ref} aria-label={`${filterType} search tools`}>
      <Styled.FilterGrid>
        {!!filterItems?.length && (
          <div>
            <Styled.ToggleButton
              onClick={handleFilter}
              aria-expanded={filterOpen}
              aria-controls="filter-dropdown"
            >
              <div></div>
              <span>Filter</span>
            </Styled.ToggleButton>
            <Styled.ToggleDropdown id="filter-dropdown" opened={filterOpen}>
              <li>
                <MixedLink url={asPath} params={{ filter: "" }}>
                  <T i18nKey={`filters.all`} />
                </MixedLink>
              </li>
              {filterItems.map((item, i) => {
                const active = query?.filter?.includes(item.id);

                return (
                  <li key={i}>
                    <MixedLink
                      className={active ? "active" : ""}
                      url={asPath}
                      params={{ filter: item.id }}
                    >
                      {item.title}
                    </MixedLink>
                  </li>
                );
              })}
            </Styled.ToggleDropdown>
          </div>
        )}
        <div>
          <Styled.ToggleButton
            onClick={handleSort}
            aria-expanded={sortOpen}
            aria-controls="sort-dropdown"
          >
            <div id="sort"></div>
            <span>{t(`filters.sort`)}</span>
          </Styled.ToggleButton>
          <Styled.ToggleDropdown id="sort-dropdown" opened={sortOpen}>
            {sortItems.map((item, i) => {
              const active = query?.sort?.includes(item.slug);

              return (
                <li key={i}>
                  <MixedLink
                    className={active ? "active" : ""}
                    url={asPath}
                    params={{ sort: item.slug }}
                  >
                    {item.title}
                  </MixedLink>
                </li>
              );
            })}
          </Styled.ToggleDropdown>
        </div>
        <Styled.FilterSearch onSubmit={handleSubmit}>
          <button type="submit">
            <IconComposer icon="search" />
            <span className="a-hidden">{t("submit-search")}</span>
          </button>
          <label htmlFor="filterSearchInput" className="a-hidden">
            {t("search-filter")}
          </label>
          <input
            id="filterSearchInput"
            type="search"
            placeholder={t("search-filter-placeholder")}
            value={searchText}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Styled.FilterSearch>
        <Styled.Clear onClick={handleReset}>
          <IconComposer icon="cancel" />
          {t(`search-clear`)}
        </Styled.Clear>
      </Styled.FilterGrid>
    </Styled.FilterNav>
  );
};

FilterBar.propTypes = {
  filterType: PropTypes.string,
  setLiveRegionMessage: PropTypes.func,
};

export default withLiveRegionChange(FilterBar);
