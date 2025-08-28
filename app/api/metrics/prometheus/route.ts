import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { register, collectDefaultMetrics } from "prom-client";

const METRICS_SECRET_TOKEN = env.METRICS_SECRET_TOKEN;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get("secret");
  let resBody: string = "";

  if (secret === METRICS_SECRET_TOKEN) {
    // The prometheus client should only be registered once
    if (
      typeof process.env.prometheusMetricsRegistered === "undefined" ||
      process.env.prometheusMetricsRegistered !== "true"
    ) {
      collectDefaultMetrics();

      // Track whether the client was registere already with an environment variable
      process.env.prometheusMetricsRegistered = "true";
    }

    // Get the metrics body and stuff it into the response body
    resBody = await register.metrics();
  } else {
    resBody = "Tokens do not match";
  }

  return NextResponse.json(resBody);
}
