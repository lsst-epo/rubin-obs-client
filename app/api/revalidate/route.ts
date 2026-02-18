import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import revalidate from "@/services/revalidation";

const REVALIDATE_SECRET_TOKEN = env.CRAFT_REVALIDATE_SECRET_TOKEN;
// This RegEx pattern should match any authenticated URL Google generates for the on-demand revalidation tool
// the known pattern is a GUID followed by '-apidata.googleusercontent.com'
const GOOGLE_AUTHENTICATED_URL_PATTERN =
  /^https:\/\/[a-zA-Z0-9]+-apidata\.googleusercontent\.com$/;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const uri = request.nextUrl.searchParams.get("uri");
  const secret = request.nextUrl.searchParams.get("secret");
  const origin = request.headers.get("origin");

  console.info(
    `[CLIENT_REVALIDATE_STATUS] Inside of revalidate endpoint in /app/api/revalidate for: ${uri}`
  );

  if (origin && !origin.match(GOOGLE_AUTHENTICATED_URL_PATTERN)) {
    console.info(
      `[CLIENT_REVALIDATE_STATUS] Origin Header '${origin}' does not match accepted header pattern. Request rejected.`
    );
    const response = NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Bad origin",
    });
    return response;
  }

  if (!uri) {
    console.info("[CLIENT_REVALIDATE_STATUS] No URI, returning");
    const response = NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });

    if (origin) response.headers.set("Access-Control-Allow-Origin", origin);
    return response;
  }

  if (secret !== REVALIDATE_SECRET_TOKEN) {
    console.info("[CLIENT_REVALIDATE_STATUS] Revalidate secret is incorrect");
    const response = NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid token",
    });

    if (origin) response.headers.set("Access-Control-Allow-Origin", origin);
    return response;
  }

  if (uri) {
    console.info("[CLIENT_REVALIDATE_STATUS] About to attempt revalidation");
    const debugOutput = await revalidate(uri);
    console.info(
      "[CLIENT_REVALIDATE_STATUS] Logging output of revalidation..."
    );
    console.info(debugOutput);

    const response = NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });

    if (origin) response.headers.set("Access-Control-Allow-Origin", origin);
    return response;
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Error revalidating",
  });
}
