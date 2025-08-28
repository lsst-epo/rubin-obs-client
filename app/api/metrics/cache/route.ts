import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import fs from "fs";

const METRICS_SECRET_TOKEN = env.METRICS_SECRET_TOKEN;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get("secret");
  let resBody: any = {};

  if (secret === METRICS_SECRET_TOKEN) {
    resBody.fetchCache = await getCachedFetchData();
    resBody.imageCache = await getCachedImageData();
  } else {
    resBody = "Tokens do not match";
  }
  return NextResponse.json(resBody);
}

async function getCachedImageData() {
  const imageCachePath = "./.next/cache/images/";

  const fetchImageData: any = {};

  if (fs.existsSync(imageCachePath)) {
    const fetchImageFiles = fs.readdirSync(imageCachePath);

    fetchImageData.imageCacheSize = fetchImageFiles.length;
  }

  return fetchImageData;
}

async function getCachedFetchData() {
  const fetchCachePath = "./.next/cache/fetch-cache/";
  const tagsManifestFilename = "tags-manifest.json";

  const fetchCacheData: any = {};

  if (fs.existsSync(fetchCachePath)) {
    const fetchCacheFiles = fs.readdirSync(fetchCachePath);
    fetchCacheData.fetchCacheSize = fetchCacheFiles.length;
    if (fs.existsSync(`${fetchCachePath}${tagsManifestFilename}`)) {
      try {
        const rawData = fs.readFileSync(
          `${fetchCachePath}${tagsManifestFilename}`,
          "utf8"
        );
        fetchCacheData.tagsManifest = JSON.parse(rawData);
      } catch (err) {
        console.error("Error reading or parsing JSON file:", err);
      }
    }
  }

  return fetchCacheData;
}
