import { NextRequest, NextResponse } from "next/server";
import pick from "lodash/pick";

type CantoScheme =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "presentation"
  | "other";

type CantoAssetParams = {
  scheme: CantoScheme;
  directUrlOriginalHash: string;
  id: string;
};

interface CantoDownloadProps {
  params: CantoAssetParams;
}

const ValidCantoSchemes: Array<CantoScheme> = [
  "image",
  "video",
  "audio",
  "document",
  "presentation",
  "other",
];

export async function GET(
  request: NextRequest,
  { params: { scheme, id, directUrlOriginalHash } }: CantoDownloadProps
) {
  if (!ValidCantoSchemes.includes(scheme)) {
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

  const {
    body,
    ok,
    status,
    statusText,
    headers: cantoHeaders,
  } = await fetch(
    `${process.env.CANTO_BASE_URL}/direct/${scheme}/${id}/${directUrlOriginalHash}/original?content-type=${contentType}&name=${fileName}`
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
