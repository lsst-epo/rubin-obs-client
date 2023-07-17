export const capitalize = (string, locale = "en-US") => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toLocaleUpperCase(locale) + string.slice(1);
};

export const hasImage = (imageArray) =>
  !!(imageArray && imageArray.length >= 1 && imageArray[0].url);

export function isAbsoluteUrl(url) {
  return /^https?:\/\//i.test(url);
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function isInternalUrl(url) {
  if (!isAbsoluteUrl(url)) return true;
  return new URL(url).origin === BASE_URL;
}

export function fileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));

  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export function isCraftPreview(query) {
  return query["x-craft-preview"] || query["x-craft-live-preview"];
}

export function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export const timezoneOffset = (timezone) => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const localeDate = new Date(
    now.toLocaleString("default", { timeZone: timezone })
  );

  return 24 - localeDate.getHours();
};

export const timezoneOffsetLocal = (timezone) => {
  const now = new Date();
  const localOffset = now.getTimezoneOffset() / 60;
  const offset = timezoneOffset(timezone);

  return localOffset - offset;
};
