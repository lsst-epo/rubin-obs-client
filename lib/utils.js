import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import GlobalDataContext from "@/contexts/GlobalData";
import { useDataList } from "@/api/entries";
import { useReleases } from "@/lib/api/noirlabReleases";
import debounce from "lodash/debounce";

export const getLinearScale = (domain, range) => {
  const [dMin, dMax] = domain;
  const [rMin, rMax] = range;

  return (value) => (value / (dMax - dMin)) * (rMax - rMin) + rMin;
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

// DATA HOOKS
export const useList = ({
  excludeId = null,
  isSitewideSearch = false,
  limit = 10,
  showsFeatured = false,
  listTypeId = null,
  section,
}) => {
  const router = useRouter();
  const { asPath, query } = router;
  const site = getSiteString(asPath);
  const adjustedLimit = adjustLimit(limit, query.page, showsFeatured);
  const offset = getOffset(limit, query.page, showsFeatured);
  const inReverse = query.sort === "descending";
  const search = query.search ? `"${query.search}"` : null;
  const categories = useGlobalData("categories");
  // if the search is sitewide (like '/search' is), our list will filter by section instead of listTypeId
  if (isSitewideSearch && query.filter) {
    const curr = getCategoryObject(categories, query.filter);
    section = curr.slug.replace(/-([a-z])/g, (x, up) => up.toUpperCase()); // make camelCase
  } else if (!isSitewideSearch) {
    listTypeId = parseInt(query.filter) || listTypeId;
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
    results.data.page = parseInt(query.page) || 1;
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
  const router = useRouter();
  const { asPath, query } = router;
  const site = getSiteString(asPath);

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

export const usePathData = () => {
  // this returns the post-domain url goodies from the router

  const router = useRouter();
  const { asPath, pathname, query } = router;
  return { asPath, pathname, query };
};

export const useDateString = (date, isShort = false) => {
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || "en-US";
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

export const useTimeString = (time) => {
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || "en-US";

  if (!time) return undefined;

  const newTime = new Date(time).toLocaleTimeString(locale);

  return newTime;
};

export const useTimeZone = (timezone) => {
  const time = new Date();
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || "en-US";
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

export const makeDateString = (date, locale = "en-US", isShort = false) => {
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

export const makeDateObject = (date, locale = "en-US", isShort = false) => {
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

export const normalizePathData = (pathnameInput) => {
  // params should come in as an object, { key: "value" }
  // however, if there is a querystring in the pathname, we must split them
  // so they are ready to be like this in the calling component:
  // const href = {
  //   pathname: simplePathname,
  //   query: { ...pathParams, ...params },
  // };
  if (!pathnameInput) return { pathParams: {} };

  const pathnameArray = pathnameInput.split("?");
  const simplePathname = pathnameArray.shift();
  const pathname =
    simplePathname.startsWith("/") || simplePathname.startsWith("mailto")
      ? simplePathname
      : "/" + simplePathname;
  const urlParams = new URLSearchParams(pathnameArray.shift());
  const pathParams = Object.fromEntries(urlParams);

  return { pathname, pathParams };
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
  const enString = asLangString ? "en-US" : "default";
  if (Array.isArray(langData)) {
    return langData[0] === "es" ? "es" : enString;
  } else {
    return langData.includes("/es") || langData === "es" ? "es" : enString;
  }
}

export function getLocaleString(siteString) {
  return siteString.toLowerCase() === "default"
    ? "en"
    : siteString.toLowerCase();
}

// DAM METADATA
export const useDamAssetAsImage = (damAsset) => {
  if (!damAsset || damAsset.length === 0) {
    return null;
  }

  const { height, width, damMetadata: rawMetadata } = damAsset;

  const damMetadata = rawMetadata.reduce((previous, current) => {
    const { metadataKey, metadataValue } = current;
    previous[metadataKey] = metadataValue;

    return previous;
  }, {});

  const { directImageUrl: url, altText, thumbnailUrl: thumb } = damMetadata;

  return {
    url,
    url2x: url,
    url3x: url,
    height,
    width,
    altText,
    thumb,
  };
};
