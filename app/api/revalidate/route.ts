import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import indexNow from "@/services/revalidation/indexNow";
import additionalRevalidations from "@/services/revalidation/additional";
import { languages } from "@/lib/i18n/settings";
import { addLocaleUriSegment } from "@/lib/i18n";

const REVALIDATE_SECRET_TOKEN = env.CRAFT_REVALIDATE_SECRET_TOKEN;
const CRAFT_HOMEPAGE_URI = "__home__";
const ENV = env.CLOUD_ENV;

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

      const path = addLocaleUriSegment(locale, parts.join("/"), {
        includeLeadingSlash: false,
      });

      revalidatePath(`/${path}`);
      additionalRevalidations(parts);
    });

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
