import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import revalidate from "@/services/revalidation";

const REVALIDATE_SECRET_TOKEN = env.CRAFT_REVALIDATE_SECRET_TOKEN;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const uri = request.nextUrl.searchParams.get("uri");
  const secret = request.nextUrl.searchParams.get("secret");

  console.info(
    `[CLIENT_REVALIDATE_STATUS] Inside of revalidate endpoint in /app/api/revalidate for: ${uri}`
  );
  if (!uri) {
    console.info("[CLIENT_REVALIDATE_STATUS] No URI, returning");
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });
  }

  if (secret !== REVALIDATE_SECRET_TOKEN) {
    console.info("[CLIENT_REVALIDATE_STATUS] Revalidate secret is incorrect");
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid token",
    });
  }

  if (uri) {
    console.info("[CLIENT_REVALIDATE_STATUS] About to attempt revalidation");
    const debugOutput = revalidate(uri);
    console.info(
      "[CLIENT_REVALIDATE_STATUS] Logging output of revalidation..."
    );
    console.info(debugOutput);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Error revalidating",
  });
}
