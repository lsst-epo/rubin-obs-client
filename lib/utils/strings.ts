import sanitize from "sanitize-html";

export function makeTruncatedString(str: string, max = 50) {
  if (!str) return "";

  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";

  return array.slice(0, max).join(" ") + ellipsis;
}

export const striptags = (dirty: string) =>
  sanitize(dirty, {
    allowedTags: [],
    allowedAttributes: {},
  });
