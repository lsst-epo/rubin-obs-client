"server-only";
import { env } from "@/env";
import { fallbackLng, languages } from "@/lib/i18n/settings";

const HOST = env.NEXT_PUBLIC_BASE_URL;
const CRAFT_HOMEPAGE_URI = "__home__";
const BING_INDEXNOW_KEY = env.BING_INDEXNOW_KEY;

/**
 * Derived from https://www.indexnow.org/documentation#response
 */
const indexNowStatusText: Record<number, string> = {
  200: "OK, URL submitted successfully",
  202: "Accepted, URL received. IndexNow key validation pending.",
  400: "Bad request, Invalid format",
  403: "Forbidden, key not valid (e.g. key not found, file found but key not in the file)",
  422: "Unprocessable Entity, URL does not belong to the host or the key is not matching the schema in the protocol",
  429: "Too Many Requests, potential spam",
};

const indexNow = async (uri: string) => {
  if (!HOST || !BING_INDEXNOW_KEY) return;

  const urlList = languages.map((locale) => {
    const parts: Array<string> = uri === CRAFT_HOMEPAGE_URI ? [] : [uri];
    if (locale !== fallbackLng) {
      parts.unshift(locale);
    }

    return new URL(parts.join("/"), HOST).toString();
  });

  const body = {
    host: HOST,
    key: BING_INDEXNOW_KEY,
    keyLocation: new URL(
      `/api/indexnow/${BING_INDEXNOW_KEY}.txt`,
      HOST
    ).toString(),
    urlList,
  };

  const { status, ok } = await fetch("https://www.bing.com/indexnow", {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

  if (!ok) {
    console.info({ body });
  }

  console.info(`${status}: ${indexNowStatusText[status]}`);
};

export default indexNow;
