export const capitalize = (string) => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const hasImage = (imageArray) =>
  !!(imageArray && imageArray.length >= 1 && imageArray[0].url);

export function isAbsoluteUrl(url) {
  return /^https?:\/\//i.test(url);
}

export function isInternalUrl(url) {
  if (!isAbsoluteUrl(url)) return true;
  return new URL(url).origin === process.env.NEXT_PUBLIC_BASE_URL;
}
