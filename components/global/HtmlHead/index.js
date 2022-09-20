import { Fragment } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { supportedTypes, titleFromEntryType } from "@/lib/api/feeds";
import siteInfoShape from "@/shapes/siteInfo";
import imageShape from "@/shapes/image";
export default function HtmlHead({
  title,
  description,
  featuredImage,
  siteInfo: { siteTitle, siteDescription, siteImage },
  children,
}) {
  const image = featuredImage?.[0] ? featuredImage[0] : siteImage?.[0];
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description || siteDescription} />
      <meta name="og:url" content="" />
      <meta name="og:type" content="article" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description || siteDescription} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content="summary" />
      {image?.url && (
        <>
          <meta name="og:image" content={image.url} />
          {image.altText && (
            <meta name="og:image:alt" content={image.altText} />
          )}
          <meta name="twitter:image" content={image.url} />
          {image.altText && (
            <meta name="twitter:image:alt" content={image.altText} />
          )}
        </>
      )}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteTitle} RSS Feed`}
        href="/feeds/feed.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={`${siteTitle} Atom Feed`}
        href="/feeds/atom.xml"
      />
      <link
        rel="alternate"
        type="application/json"
        title={`${siteTitle} JSON Feed`}
        href="/feeds/feed.json"
      />
      {supportedTypes.map((entryType) => (
        <Fragment key={entryType}>
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`${siteTitle} RSS Feed — ${titleFromEntryType(entryType)}`}
            href={`/feeds/${entryType}/feed.xml`}
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title={`${siteTitle} Atom Feed — ${titleFromEntryType(entryType)}`}
            href={`/feeds/${entryType}/atom.xml`}
          />
          <link
            rel="alternate"
            type="application/json"
            title={`${siteTitle} JSON Feed — ${titleFromEntryType(entryType)}`}
            href={`/feeds/${entryType}/feed.json`}
          />
        </Fragment>
      ))}
      {children}
    </Head>
  );
}

HtmlHead.displayName = "Global.HtmlHead";

HtmlHead.propTypes = {
  siteInfo: siteInfoShape,
  title: PropTypes.string,
  description: PropTypes.string,
  featuredImage: PropTypes.arrayOf(imageShape),
  children: PropTypes.node,
};
