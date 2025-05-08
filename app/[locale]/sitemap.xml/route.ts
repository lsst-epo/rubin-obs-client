import { NextRequest, NextResponse } from "next/server";
import { XMLBuilder } from "fast-xml-parser";
import {
  generateAlternateLanguages,
  generateSitemapUrl,
  getSitemapData,
  getSiteMapNewsData,
} from "@/lib/api/sitemap";

export async function GET(
  request: NextRequest,
  { params: { locale } }: LocaleProps
) {
  const pages = await getSitemapData(locale);
  const pageData = pages.map(({ uri, dateUpdated }) => {
    return {
      loc: generateSitemapUrl(uri, locale),
      lastmod: dateUpdated,
      "xhtml:link": generateAlternateLanguages(uri, locale),
    };
  });
  const { siteTitle, news } = await getSiteMapNewsData(locale);

  const today = new Date();
  const recentNewsThreshold = new Date(
    today.getTime() - 1000 * 60 * 60 * 24 * 2
  );

  const newsData = news.map(({ uri, dateUpdated, title, date }) => {
    const entry = {
      loc: generateSitemapUrl(uri, locale),
      lastmod: dateUpdated,
      "xhtml:link": generateAlternateLanguages(uri, locale),
    };

    if (new Date(date) > recentNewsThreshold) {
      entry["news:news"] = {
        "news:publication": {
          "news:name": siteTitle,
          "news:language": locale,
        },
        "news:publication_date": date,
        "news:title": title,
      };
    }

    return entry;
  });

  // todo: retrieve gallery sitemap data
  // todo: map gallery sitemap data to JS objects with loc, lastmod, and "xhtml:link" attributes

  const data = {
    "?xml": {
      $version: "1.0",
      $encoding: "UTF-8",
    },
    urlset: {
      $xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      "$xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "$xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
      url: pageData.concat(newsData),
      // todo: concat gallery data
    },
  };
  const builder = new XMLBuilder({
    attributeNamePrefix: "$",
    arrayNodeName: "url",
    ignoreAttributes: false,
  });
  const output = builder.build(data);

  return new NextResponse(output, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
