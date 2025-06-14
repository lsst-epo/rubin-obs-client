import { NextRequest, NextResponse } from "next/server";
import { redirect, RedirectType } from "next/navigation";
import { env } from "@/env";
import { graphql } from "@/gql/gql";
import { fallbackLng } from "@/lib/i18n/settings";
import queryAPI from "@/lib/api/client/query";
import { getLocaleString, getSiteFromLocale } from "@/lib/helpers/site";
import previewSession from "@/services/sessions/preview";
import { addLocaleUriSegment } from "@/lib/i18n";

const PREVIEW_SECRET_TOKEN = env.CRAFT_SECRET_TOKEN;
const CRAFT_HOMEPAGE_URI = "__home__";

const Query = graphql(`
  query PagePreviewQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      __typename
      uri
      title
    }
  }
`);

function isCraftPreview(params: URLSearchParams): boolean {
  return (
    !!params.get("x-craft-preview") || !!params.get("x-craft-live-preview")
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const previewToken = searchParams.get("token") || undefined;
  const site = getSiteFromLocale(
    (searchParams.get("site") || fallbackLng).toLowerCase()
  );
  const locale = getLocaleString(site);
  const uri = searchParams.get("uri");

  // Check that this request came from Craft
  if (!isCraftPreview) {
    return new NextResponse("Invalid client", { status: 401 });
  }

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== PREVIEW_SECRET_TOKEN) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  if (!uri) {
    return new NextResponse("URI missing", { status: 422 });
  }

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
    previewToken,
    fetchOptions: { cache: "no-store" },
  });

  // If the uri doesn't exist prevent draft mode from being enabled
  if (!data?.entry?.uri) {
    return new NextResponse("Invalid uri", { status: 422 });
  }

  previewSession().start({ previewToken });

  const segments: Array<String> = [];

  if (data.entry.uri !== CRAFT_HOMEPAGE_URI) {
    segments.push(data.entry.uri);
  }

  // Redirect to the path from the fetched entry
  // We don't redirect to searchParams.uri as that might lead to open redirect vulnerabilities
  const { pathname } = new URL(
    addLocaleUriSegment(locale, segments.join("/")),
    env.NEXT_PUBLIC_BASE_URL
  );

  redirect(`${pathname}?${Date.now()}`, RedirectType.replace);
}
