import PropTypes from "prop-types";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import NewsHero from "./NewsHero";
import NewsArticle from "./Article";
import NewsList from "@/dynamic/NewsList";
import MediaAside from "@/components/organisms/MediaAside";
import * as Styled from "./styles";
import { getReleaseHero } from "@/lib/api/noirlab";
import { useTranslation } from "@/lib/i18n";
import { getGlobalData } from "@/lib/api/globals";
import { getLocale } from "next-intl/server";

export default async function NewsPage({ data }) {
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

  const locale = await getLocale();
  const { t } = await useTranslation(locale);

  if (hero.length === 0 && releaseImages) {
    hero.push(getReleaseHero(releaseImages));
  }

  const { rootPages } = await getGlobalData(locale);
  const customBreadcrumbs = rootPages
    .filter((p) => p.header?.includes("News"))
    .map((p) => p.pageEntry)
    .flat(1);

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
      <Breadcrumbs
        breadcrumbs={[...customBreadcrumbs, pageLink]}
        locale={locale}
      />
      <NewsHero
        caption={heroCaption}
        data={hero}
        narrowCaption={showAside}
        {...{ focalPointX, focalPointY }}
      />
      <Styled.NewsDetail $showAside={showAside}>
        {data && <NewsArticle data={data} hero={hero[0]} />}
        {showAside && (
          <MediaAside
            manualAssets={manualAssets}
            contentBlockAssets={mediaContentBlocks}
            releaseImages={releaseImages}
            releaseVideos={releaseVideos}
            tags={postTags}
            pathForTagSearch={rootHomeLink}
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
