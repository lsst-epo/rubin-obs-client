import { useContext, useEffect } from "react";
import GlobalDataContext from "@/contexts/GlobalData";
import { useDataList } from "@/api/entries";
import { useReleases } from "@/lib/api/noirlabReleases";
import debounce from "lodash/debounce";
import { useFilterParams } from "@/contexts/FilterParams";
import { fallbackLng } from "./i18n/settings";
import { usePathname } from "next/navigation";

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

function getIsFirstPage(page) {
  const parsed = parseInt(page, 10);

  return !parsed || parsed === 1;
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

/**
 * If an odd number of items is shown on the first page,
 * then we need to factor in the adjusted limit on that page
 * for all subsequent pages 🙃
 */
function getOffset(limit, page, showsFeatured) {
  const pageInt = parseInt(page, 10);
  // if list shows no featured item, calculate offset normally
  if (!showsFeatured) return (pageInt - 1) * limit || null;
  // if we're on the first page, there's no offset
  const isFirstPage = getIsFirstPage(page);
  if (isFirstPage) return null;
  // for subsequent pages, the offset is reduced by one
  return (pageInt - 1) * limit - 1;
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
  const customBreadcrumbs = rootPages
    .filter((p) => p.header?.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

function dateWoTimezone(iso) {
  // attuned to the iso-ish php dateformat from Craft
  return new Date(iso.slice(0, -6));
}

export const useDateString = (date, options = {}) => {
  const { isShort = false, isCraftDate = true } = options;
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || fallbackLng;
  const newDate = new Date(date);

  /**
   * Craft dates are stored in UTC with the timezone applied as an hours offset
   * The user's timezone offset needs to be removed to restore the original date
   *
   * https://craftcms.com/docs/4.x/time-fields.html#converting-from-a-date-field
   */
  if (isCraftDate) {
    newDate.setTime(
      newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000
    );
  }
  const localeOptions = {
    year: "numeric",
    month: isShort ? "short" : "long",
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, localeOptions);
  isShort && (dateString = dateString.replace(",", ""));

  return dateString;
};

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

export const useNavHider = (
  prevScrollPos,
  setPrevScrollPos,
  visible,
  setVisible
) => {
  const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      setVisible(true);
      return;
    }

    if (currentScroll > prevScrollPos && visible === true) {
      // down
      setVisible(false);
    } else if (currentScroll < prevScrollPos && visible === false) {
      // up
      setVisible(true);
    }
    setPrevScrollPos(currentScroll);
  }, 30);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
};

// CONTENT MUNGERS
export const makeBreadcrumbs = (uri) => {
  return uri.split("/").map((crumb, i) => {
    const title = crumb
      .replace("-", " ")
      .replace(/(^|\s)\S/g, (t) => t.toUpperCase());
    return { id: `${i}`, uri: crumb, title };
  });
};

// this is like useCustomBreadcrumbs but is not a hook because it doesn't useGlobalData()
export const makeCustomBreadcrumbs = (rootPages, rootPageString) => {
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export const makeDateString = (date, locale = fallbackLng, isShort = false) => {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: `${isShort ? "short" : "long"}`,
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, options);
  isShort && (dateString = dateString.replace(",", ""));
  return dateString;
};

export const makeDateObject = (date, locale = fallbackLng, isShort = false) => {
  if (!date) return;
  const newDate = new Date(date);
  const options = {
    month: `${isShort ? "short" : "long"}`,
  };
  const dateObject = {
    year: newDate.getFullYear(),
    month: new Intl.DateTimeFormat(locale, options).format(newDate),
    day: newDate.getDate(),
  };
  return dateObject;
};

export const checkIfBetweenDates = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return true;
  }

  const currentDate = new Date();
  const from = new Date(startDate);
  const to = new Date(endDate);

  return currentDate > from && currentDate < to;
};

export const createLocationString = (
  city,
  state,
  country,
  address = "",
  isFull = false
) => {
  // logic for displaying city/state in US, city/country outside
  let start;
  let end;
  if (isFull) {
    start = address ? address + ", " : "";
    end = state ? state + ", " + country : country;
  } else {
    end = country === "USA" || country === "United States" ? state : country;
  }
  const loc = `${start || ""}${city ? city + ", " : ""}${end || ""}`;
  return loc;
};

export function makeTruncatedString(str, max = 50) {
  if (!str) return "";

  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";

  return array.slice(0, max).join(" ") + ellipsis;
}

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

  const {
    metadata,
    url,
    width,
    height,
    fileInfo: { fileType },
  } = data;
  const { directUrlPreview = "", directUrlOriginal = "", preview = "" } = url;

  const urlWithoutConstraint = directUrlPreview.slice(0, -3);
  const constraint = Math.max(width, height);

  const altText = metadata[`AltText${key}`];
  const caption = metadata[`Caption${key}`];
  const credit = metadata.Credit;
  const useOriginal = fileType === "gif";

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
