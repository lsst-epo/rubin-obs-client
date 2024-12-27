import { NextRequest, NextResponse } from "next/server";
import pick from "lodash/pick";
import {
  SupportedCantoAssetScheme,
  SupportedCantoScheme,
} from "@/lib/api/galleries/schema";

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
    }/direct/${scheme}/${id}/${directUrlOriginalHash}/original?${proxySearchParams.toString()}`
  );

  if (ok) {
    const headers = new Headers(
      pick(Object.fromEntries(cantoHeaders.entries()), [
        "content-length",
        "content-type",
        "date",
        "etag",
        "last-modified",
      ])
    );

    headers.set("content-disposition", `attachment; filename="${fileName}"`);

    return new NextResponse(body, {
      status: 200,
      headers,
    });
  } else {
    return new NextResponse(statusText, { status });
  }
}
