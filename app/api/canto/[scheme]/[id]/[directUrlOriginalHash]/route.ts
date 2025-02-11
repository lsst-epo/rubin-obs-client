import { NextRequest, NextResponse } from "next/server";
import pick from "lodash/pick";
import {
  SupportedCantoAssetScheme,
  SupportedCantoScheme,
} from "@/lib/api/galleries/schema";
import { headers } from "next/headers";

type CantoAssetParams = {
  scheme: SupportedCantoAssetScheme;
  directUrlOriginalHash: string;
  id: string;
};

interface CantoDownloadProps {
  params: CantoAssetParams;
}

export async function GET(
  request: NextRequest,
  { params: { scheme, id, directUrlOriginalHash } }: CantoDownloadProps
) {
  const headersList = headers();
  const referer = headersList.get("referer");

  if (!referer) {
    return new NextResponse("Invalid client", { status: 403 });
  }

  const { origin } = new URL(referer);

  if (process.env.NEXT_PUBLIC_BASE_URL !== origin) {
    return new NextResponse("Invalid client", { status: 403 });
  }

  const { error } = SupportedCantoScheme.safeParse(scheme);

  if (error) {
    return new NextResponse("Invalid scheme", { status: 400 });
  }

  const { searchParams } = request.nextUrl;
  const fileName = searchParams.get("name");
  const contentType = searchParams.get("content-type");

  if (!fileName) {
    return new NextResponse("No filename specified", { status: 400 });
  }

  if (!contentType) {
    return new NextResponse("Invalid content type", { status: 400 });
  }

  const proxySearchParams = new URLSearchParams({ fileName, contentType });

  const {
    body,
    ok,
    status,
    statusText,
    headers: cantoHeaders,
  } = await fetch(
    `${
      process.env.CANTO_BASE_URL
    }/direct/${scheme}/${id}/${directUrlOriginalHash}/original?${proxySearchParams.toString()}`,
    { cache: "no-store" }
  );

  if (ok) {
    const headers = new Headers({
      ...pick(Object.fromEntries(cantoHeaders.entries()), [
        "content-length",
        "content-type",
        "date",
        "etag",
        "last-modified",
      ]),
      "content-disposition": `attachment; filename="${fileName}"`,
      "X-Robots-Tag": "noindex",
    });

    return new NextResponse(body, {
      status: 200,
      headers,
    });
  } else {
    return new NextResponse(statusText, { status });
  }
}
