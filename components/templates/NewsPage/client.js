"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Breadcrumbs from "@/page/Breadcrumbs";
import NewsHero from "./NewsHero";
import NewsArticle from "./NewsArticle";
import NewsList from "@/dynamic/NewsList";
import NewsAside from "@/components/page/Aside/patterns/Media";
import * as Styled from "./styles";
import { getReleaseHero } from "@/lib/api/noirlab";

export default function NewsPage({ data }) {
  const {
    contentBlocksNews = [],
    hero = [],
    focalPointX,
    focalPointY,
    heroCaption,
    id,
    newsAssets,
    postTags,
    title,
    uri,
    images: releaseImages,
    videos: releaseVideos,
  } = data;

  if (hero.length === 0 && releaseImages) {
    hero.push(getReleaseHero(releaseImages));
  }

  const { t } = useTranslation();

  const customBreadcrumbs = useCustomBreadcrumbs("News");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
  };
  const manualAssets = [];
  const heroBlock =
    hero?.length > 0
      ? {
          id: id + "hero",
          typeHandle: "image",
          image: hero,
          caption: heroCaption,
        }
      : null;
  const mediaContentBlocks = [...contentBlocksNews].filter(
    (block) => block.typeHandle === "image" || block.typeHandle === "video"
  );

  newsAssets.forEach((a, i) => {
    if (a.image?.length > 0) {
      // If there are manually added news assets combine them with the content block media assets
      mediaContentBlocks.push({
        id: id + i,
        typeHandle: "image",
        image: a.image,
        caption: a.caption,
      });
    } else {
      manualAssets.push(a);
    }
  });
  // If there is a hero then combine it with the content block media assets
  if (heroBlock && !releaseImages) mediaContentBlocks.unshift(heroBlock);

  // Only show the aside if there are news assets
  const showAside =
    manualAssets?.length > 0 ||
    mediaContentBlocks?.length > 0 ||
    releaseImages?.length > 0 ||
    releaseVideos?.length > 0 ||
    postTags?.length > 0;

  return (
    <>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <NewsHero
        caption={heroCaption}
        data={hero}
        narrowCaption={showAside}
        {...{ focalPointX, focalPointY }}
      />
      <Styled.NewsDetail $showAside={showAside}>
        {data && <NewsArticle data={data} />}
        {showAside && (
          <NewsAside
            manualAssets={manualAssets}
            contentBlockAssets={mediaContentBlocks}
            releaseImages={releaseImages}
            releaseVideos={releaseVideos}
            tags={postTags}
            rootHomeLink={rootHomeLink}
          />
        )}
      </Styled.NewsDetail>
      <NewsList
        button={{
          text: t(`news.back-to-posts`),
          uri: `${rootHomeLink?.uri}`,
        }}
        excludeId={id}
        header={t(`news.related-posts`)}
        limit={3}
        isWide
        gridType="pages"
        isRelatedList
      />
    </>
  );
}

NewsPage.displayName = "Template.NewsPage";

NewsPage.propTypes = {
  data: PropTypes.object,
};
