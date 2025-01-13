import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import tags from "@/lib/api/client/tags";
import { fallbackLng, languages } from "@/lib/i18n/settings";
import { addLocaleUriSegment } from "@/lib/i18n";

const HOST = process.env.NEXT_PUBLIC_BASE_URL;
const REVALIDATE_SECRET_TOKEN = process.env.CRAFT_REVALIDATE_SECRET_TOKEN;
const CRAFT_HOMEPAGE_URI = "__home__";
const BING_INDEXNOW_KEY = process.env.BING_INDEXNOW_KEY;
const ENV = process.env.CLOUD_ENV;

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

    return `${HOST}/${parts.join("/")}`;
  });

  const body = {
    host: HOST,
    key: BING_INDEXNOW_KEY,
    keyLocation: `${HOST}/api/indexnow/${BING_INDEXNOW_KEY}.txt`,
    urlList,
  };

  const { status } = await fetch("https://www.bing.com/indexnow", {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

  console.info(`${status}: ${indexNowStatusText[status]}`);
};

const revalidateChildren = (parts: Array<string>): "layout" | "page" => {
  // revalidate gallery children if the URI is a gallery, but not the root gallery
  if (parts.indexOf("gallery") === 0 && parts.length > 1) {
    return "layout";
  }

  return "page";
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const uri = request.nextUrl.searchParams.get("uri");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!uri) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });
  }

  if (secret !== REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid token",
    });
  }

  if (uri) {
    languages.forEach((locale) => {
      const parts: Array<string> =
        uri === CRAFT_HOMEPAGE_URI ? [] : uri.split("/");

      const path = addLocaleUriSegment(locale, parts.join("/"));

      revalidatePath(path, revalidateChildren(parts));
    });

    revalidateTag(tags.globals);

    if (ENV === "PROD") {
      await indexNow(uri);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Error revalidating",
  });
}
