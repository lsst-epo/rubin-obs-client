import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  fluidScale,
  BREAK_MOBILE,
  containerRegular,
  respond,
} from "@/styles/globalStyles";
import { useTranslation } from "react-i18next";
import MixedLink from "@/atomic/MixedLink";
import T from "@/page/Translate";
import { useOnClickOutside } from "@/hooks/listeners";
import {
  usePathData,
  normalizePathData,
  getCategoryGroup,
  useGlobalData,
} from "@/lib/utils";
import SearchIcon from "@/svg/icons/Search";
import withLiveRegionChange from "@/hoc/withLiveRegionChange";
import IconComposer from "@/components/svg/IconComposer";

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
      pathname: pathname,
      query: { ...pathParams, page: 1, search: searchText },
    });
  };

  const handleReset = () => {
    setSearchText("");
    setLiveRegionMessage("Search cleared.");
    router.push(pathname);
  };

  return (
    <FilterNav ref={ref} aria-label={`${filterType} search tools`}>
      <FilterGrid>
        <div>
          <ToggleButton
            onClick={handleFilter}
            aria-expanded={filterOpen}
            aria-controls="filter-dropdown"
          >
            <div></div>
            <span>Filter</span>
          </ToggleButton>
          <ToggleDropdown id="filter-dropdown" opened={filterOpen}>
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
                    <T i18nKey={`filters.${item.slug}`} />
                  </MixedLink>
                </li>
              );
            })}
          </ToggleDropdown>
        </div>
        <div>
          <ToggleButton
            onClick={handleSort}
            aria-expanded={sortOpen}
            aria-controls="sort-dropdown"
          >
            <div id="sort"></div>
            <span>Sort by</span>
          </ToggleButton>
          <ToggleDropdown id="sort-dropdown" opened={sortOpen}>
            {sortItems.map((item, i) => {
              const active = query?.sort?.includes(item.slug);

              return (
                <li key={i}>
                  <MixedLink
                    className={active ? "active" : ""}
                    url={asPath}
                    params={{ sort: item.slug }}
                  >
                    <T i18nKey={`filters.${item.slug}`} />
                  </MixedLink>
                </li>
              );
            })}
          </ToggleDropdown>
        </div>
        <FilterSearch onSubmit={handleSubmit}>
          <button type="submit">
            <SearchIcon />
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
        </FilterSearch>
        <Clear onClick={handleReset}>
          <IconComposer icon="cancel" />
          {t(`search-clear`)}
        </Clear>
      </FilterGrid>
    </FilterNav>
  );
};

const FilterNav = styled.nav`
  font-size: 16px;
  font-weight: bold;
  color: var(--neutral80);
  background-color: var(--neutral20);
  padding: 12px 0;
`;

const FilterGrid = styled.div`
  ${containerRegular()}
  position: relative;
  display: grid;
  grid-template-columns: minmax(auto, 180px) minmax(auto, 180px) 1fr max-content;
  align-items: center;
  justify-content: left;

  > * {
    position: relative;
  }

  @media (max-width: 720px) {
    grid-template: auto / 1fr 1fr min-content;
    grid-template-areas:
      "search search search"
      "filter sort clear";
    grid-row-gap: 20px;
    > :first-child {
      grid-area: filter;
    }
    > :nth-child(2) {
      grid-area: sort;
    }
    > :nth-child(4) {
      grid-area: clear;
    }
    > :nth-child(3) {
      grid-area: search;
      text-align: left;
      input {
        min-width: 82vw;
        width: 94%;
      }
    }
  }
`;

const ToggleButton = styled.button`
  position: relative;
  height: 30px;
  white-space: nowrap;

  > div {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 30px;
    height: 4px;
    margin-top: -0.1em;
    background-color: var(--neutral80);

    &:after,
    &:before {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      background-color: var(--neutral80);
    }

    &:before {
      transform: translateY(-9px);
    }

    &:after {
      transform: translateY(9px);
    }

    &#sort {
      left: 5px;
      width: 20px;

      &:before {
        left: -5px;
        width: 30px;
      }

      &:after {
        left: 5px;
        width: 10px;
      }
    }
  }
  > span {
    padding-left: 50px;
  }
  ${respond(`div {display: none;} span {padding-left: 0;}`, BREAK_MOBILE)}
`;

const ToggleDropdown = styled.ul`
  position: absolute;
  top: 40px;
  opacity: ${(p) => (p.opened ? 1 : 0)};
  visibility: ${(p) => (p.opened ? "visible" : "hidden")};
  width: 300px;
  background-color: var(--neutral20);
  transition: opacity 0.2s;
  z-index: ${(p) => (p.opened ? 1 : -1)};
  ${respond(`width: auto;`, "640px")}

  li {
    a {
      display: block;
      padding: 10px 20px;
      font-weight: normal;
      text-decoration: none;

      &:hover,
      &.active {
        background-color: var(--turquoise50);
        font-weight: bold;
        color: white;
      }
    }

    &:first-of-type {
      margin-top: 20px;
    }
  }
`;

const FilterSearch = styled.form`
  text-align: right;
  white-space: nowrap;

  button {
    padding: 4px 5px 4px 15px;
    height: 50px;
    vertical-align: middle;
    border-radius: 25px 0 0 25px;
    background-color: white;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  input {
    border: none;
    width: ${fluidScale("480px", "200px")};
    height: 50px;
    padding: 4px 6px 5px 6px;
    vertical-align: middle;
    border-radius: 0 25px 25px 0;
    color: var(--neutral80);
    background-color: white;
  }
`;

const Clear = styled.button`
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  margin-left: 0.5em;
  padding: 0.5em 1.5em;
  white-space: nowrap;
  height: 50px;
  border-radius: 25px;
  background-color: var(--neutral30);
  &:hover {
    background-color: var(--red20);
  }
  svg {
    margin-right: 4px;
  }
`;

FilterBar.propTypes = {
  filterType: PropTypes.string,
  setLiveRegionMessage: PropTypes.func,
};

export default withLiveRegionChange(FilterBar);
