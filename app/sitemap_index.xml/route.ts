import { NextResponse } from "next/server";
import { XMLBuilder } from "fast-xml-parser";
import { generateSitemapUrl } from "@/lib/api/sitemap";
import { languages } from "@/lib/i18n/settings";

export async function GET() {
  const data = {
    "?xml": {
      $version: "1.0",
      $encoding: "UTF-8",
    },
    sitemapindex: {
      $xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      sitemap: languages.map((language) => {
        return { loc: generateSitemapUrl("sitemap.xml", language, true) };
      }),
    },
  };
  const builder = new XMLBuilder({
    attributeNamePrefix: "$",
    arrayNodeName: "sitemap",
    ignoreAttributes: false,
  });
  const output = builder.build(data);

  return new NextResponse(output, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
