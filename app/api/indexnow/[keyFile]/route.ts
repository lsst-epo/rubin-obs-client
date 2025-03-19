import { env } from "@/env";
import { NextRequest } from "next/server";

type IndexNowParams = {
  keyFile: string;
};

interface IndexNowProps {
  params: IndexNowParams;
}

const BING_INDEXNOW_KEY = env.BING_INDEXNOW_KEY;

export async function GET(
  request: NextRequest,
  { params: { keyFile } }: IndexNowProps
): Promise<Response> {
  const [fileName, fileType] = keyFile.split(".");

  if (!BING_INDEXNOW_KEY) {
    return new Response("No key found", { status: 500 });
  }

  if (fileType !== "txt") {
    return new Response("Invalid file type", { status: 400 });
  }

  if (fileName !== BING_INDEXNOW_KEY) {
    return new Response("Invalid key", { status: 400 });
  }

  return new Response(BING_INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
