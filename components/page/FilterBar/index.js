"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getCategoryGroup, useGlobalData } from "@/lib/utils";
import withLiveRegionChange from "@/hoc/withLiveRegionChange";
import { useFilterParams } from "@/contexts/FilterParams";
import FilterDropdownList from "@/components/molecules/FilterDropdownList";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import Filters from "@/components/organisms/Filters";

const FilterBar = ({ filterType, setLiveRegionMessage }) => {
  const { hidden = [] } = useFilterParams();
  const { t } = useTranslation();

  const { categories } = useGlobalData();
  const filterMap = {
    events: "eventFilters",
    jobs: "jobTypes",
    news: "newsFilters",
    staffProfiles: "staffFilters",
    search: "searchFilters",
  };
  const filterItems = getCategoryGroup(categories, filterMap[filterType]);
  const sortItems = getCategoryGroup(categories, "sortOptions");
  const hasFilter = !hidden.includes("filter") && !!filterItems?.length;
  const hasSort = !hidden.includes("sort");
  const hasSearch = !hidden.includes("search");

  const handleReset = () => {
    setLiveRegionMessage("Search cleared.");
  };

  return (
    <Filters hasSearch={hasSearch} onFiltersCleared={handleReset}>
      {hasFilter && (
        <FilterDropdownList
          name="Filter"
          filters={filterItems.map(({ title, id }) => {
            return { name: title, query: "filter", value: id };
          })}
          icon={<UniqueIconComposer icon="filter" />}
        />
      )}
      {hasSort && (
        <FilterDropdownList
          name={t("filters.sort")}
          filters={sortItems.map(({ title, slug }) => {
            return { name: title, query: "sort", value: slug };
          })}
          icon={<UniqueIconComposer icon="sort" />}
          includeReset={false}
        />
      )}
    </Filters>
  );
};

FilterBar.propTypes = {
  filterType: PropTypes.string,
  setLiveRegionMessage: PropTypes.func,
};

export default withLiveRegionChange(FilterBar);
