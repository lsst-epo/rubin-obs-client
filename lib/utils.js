import { useContext } from "react";
import GlobalDataContext from "@/contexts/GlobalData";
import { useDataList } from "@/api/entries";
import { useReleases } from "@/lib/api/noirlabReleases";
import { useFilterParams } from "@/contexts/FilterParams";
import { fallbackLng } from "./i18n/settings";
import { usePathname } from "next/navigation";
import { getOffset, getIsFirstPage } from "./utils/pagination";
import { getCustomBreadcrumbs } from "./helpers/breadcrumbs";

export const getLinearScale = (domain, range, clamp = false) => {
  return (val) => {
    const sub = domain[1] - domain[0];

    if (sub === 0) {
      return (range[0] + range[1]) / 2;
    }
    let t = (val - domain[0]) / sub;

    if (clamp) {
      t = Math.min(Math.max(t, 0), 1);
    }

    return t * (range[1] - range[0]) + range[0];
  };
};

function nearestOdd(value) {
  return 2 * Math.round(value / 2) - 1;
}

/**
 * Lists with a featured item on the first page need an odd-numbered limit
 * so that the final two-column row is balanced
 */
function adjustLimit(limit, page, showsFeatured) {
  const isFirstPage = getIsFirstPage(page);

  if (!isFirstPage || !showsFeatured) return limit;

  return nearestOdd(limit);
}

const getListTypeId = (filter, listTypeId) => {
  if (Array.isArray(filter)) {
    return filter.map((id) => parseInt(id));
  }

  if (filter) {
    return parseInt(filter);
  }

  return listTypeId;
};

// DATA HOOKS
export const useList = ({
  excludeId = null,
  isSitewideSearch = false,
  limit = 10,
  showsFeatured = false,
  listTypeId = null,
  section,
}) => {
  const pathName = usePathname();
  const { params } = useFilterParams();
  const site = getSiteString(pathName);
  const adjustedLimit = adjustLimit(limit, params.page, showsFeatured);
  const offset = getOffset(limit, params.page, showsFeatured);
  const inReverse = params.sort === "descending";
  const search = params.search ? `"${params.search}"` : null;
  const categories = useGlobalData("categories");
  // if the search is sitewide (like '/search' is), our list will filter by section instead of listTypeId
  if (isSitewideSearch && params.filter) {
    const curr = getCategoryObject(categories, params.filter);
    section = curr.slug.replace(/-([a-z])/g, (x, up) => up.toUpperCase()); // make camelCase
  } else if (!isSitewideSearch) {
    listTypeId = getListTypeId(params.filter, listTypeId);
  }
  const results = useDataList({
    excludeId,
    inReverse,
    limit: adjustedLimit,
    offset,
    search,
    site,
    listTypeId,
    section,
    isSitewideSearch,
  });

  // mix in the noirlabReleases from additional fetch to different endpoint
  const entriesWithNoirlabReleases = useReleases(site, results?.data?.entries);

  if (entriesWithNoirlabReleases && results?.data) {
    const { entries, isLoading, isError } = entriesWithNoirlabReleases;
    results.data.entries = entries;
    results.isLoading = isLoading;
    results.isError = isError;
  }

  // let's just keep all the data numbers together!
  if (results?.data) {
    results.data.currentCategory = listTypeId;
    results.data.offset = offset;
    results.data.limit = adjustedLimit;
    results.data.page = parseInt(params.page) || 1;
  }

  return results;
};

// This version does not use the query string for filtering
export const useListForBlock = ({
  excludeId = null,
  limit = 5,
  listTypeId = null,
  section,
}) => {
  const pathName = usePathname();
  const site = getSiteString(pathName);

  const results = useDataList({
    excludeId,
    limit,
    listTypeId,
    site,
    section,
  });

  return results;
};

export const useGlobalData = (which) => {
  const globalData = useContext(GlobalDataContext);
  if (which && globalData[which]) {
    return globalData[which];
  } else {
    return globalData;
  }
};

export const useGlobalLanguage = () => {
  const { localeInfo } = useContext(GlobalDataContext);
  return localeInfo.language;
};

export const useCustomBreadcrumbs = (rootPageString) => {
  const rootPages = useGlobalData("rootPages");
  return getCustomBreadcrumbs({ rootPages, header: rootPageString });
};

function dateWoTimezone(iso) {
  // attuned to the iso-ish php dateformat from Craft
  return new Date(iso.slice(0, -6));
}

export const useTimeString = (iso) => {
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || fallbackLng;
  if (!iso) return undefined;
  return dateWoTimezone(iso).toLocaleTimeString(locale);
};

export const useTimeZone = (timezone) => {
  const time = new Date();
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || fallbackLng;
  const options = {};

  if (!timezone) return undefined;

  if (timezone) {
    options.timeZone = timezone;
    options.timeZoneName = "short";
  }

  const timezoneAbv = timezone
    ? new Date(time).toLocaleTimeString(locale, options).slice(-3)
    : "";
  const localizedTimezone = timezone ? `${timezoneAbv} ${timezone}` : "";

  return localizedTimezone;
};

// this is like useCustomBreadcrumbs but is not a hook because it doesn't useGlobalData()
export const makeCustomBreadcrumbs = (rootPages, rootPageString) => {
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export function normalizeItemData(items, whichEntry = "entry") {
  return items
    .filter((item) => item?.[whichEntry]?.length > 0)
    .map((item) => item[whichEntry]?.[0]);
}

/** @function makeReleaseFeature
 * @param {Array<any>} images
 * @param {"banner1920" | "large" | "medium" | "news" | "newsfeature" | "newsmini" | "original" | "screen" | "screen640" | "thumb350x" | "thumb700x"} format
 */
export function makeReleaseFeature(images, format = "screen") {
  if (!images) return;
  const feature = images[0];
  if (!feature) return;

  const { title, height, width, formats } = feature;

  return [
    {
      altText: title,
      url: formats[format],
      url2x: formats[format],
      url3x: formats[format],
      height,
      width,
    },
  ];
}

// CATEGORY STUFF
export const getCategoryId = (categories, slug) => {
  return categories.reduce((a, b) => (b.slug === slug ? a + b.id : a), "");
};

export const getCategoryObject = (categories, id) => {
  const result = categories.filter((c) => c.id === id.toString());
  return result[0];
};
export const getCategoryGroup = (categories, group) => {
  return categories.filter((c) => c.groupHandle === group);
};

// LANGUAGE STUFF
export function getSiteString(langData = "", asLangString = false) {
  const enString = asLangString ? fallbackLng : "default";
  if (Array.isArray(langData)) {
    return langData[0] === "es" ? "es" : enString;
  } else {
    return langData.includes("/es") || langData === "es" ? "es" : enString;
  }
}

// DAM METADATA
export const imageShaper = (site, data, className) => {
  if (!data) return undefined;

  const localeKeys = {
    default: "EN",
    es: "ES",
  };

  const key = localeKeys[site];

  const { metadata, url, width, height, fileInfo } = data;
  const { directUrlPreview = "", directUrlOriginal = "", preview = "" } = url;

  const urlWithoutConstraint = directUrlPreview.slice(0, -3);
  const constraint = Math.max(width, height);

  const altText = metadata[`AltText${key}`];
  const caption = metadata[`Caption${key}`];
  const credit = metadata.Credit;
  const useOriginal = fileInfo?.fileType === "gif";

  return {
    url: useOriginal
      ? directUrlOriginal
      : `${urlWithoutConstraint}${Math.floor(constraint / 3)}`,
    url2x: useOriginal
      ? directUrlOriginal
      : `${urlWithoutConstraint}${Math.floor(constraint / 2)}`,
    url3x: directUrlOriginal,
    thumb: preview,
    width: Number(width),
    height: Number(height),
    className,
    altText: altText === null ? undefined : altText,
    caption: caption === null ? undefined : caption,
    credit: credit === null ? undefined : credit,
  };
};
