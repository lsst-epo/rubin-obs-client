import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs, makeReleaseHero } from "@/lib/utils";
import Body from "@/global/Body";
import Breadcrumbs from "@/page/Breadcrumbs";
import Hero from "@/page/Hero";
import NewsArticle from "./NewsArticle";
import NewsList from "@/dynamic/NewsList";
import NewsAside from "./NewsAside";
import * as Styled from "./styles";

export default function NewsPage({ data }) {
  const {
    contentBlocksNews = [],
    description,
    headline,
    featuredImage = [],
    hero = [],
    id,
    newsAssets,
    postTags,
    title,
    uri,
    images: releaseImages,
    videos: releaseVideos,
  } = data;
  const { t } = useTranslation();
  const bodyProps = {
    description: description || headline,
    featuredImage,
    title,
  };
  const customBreadcrumbs = useCustomBreadcrumbs("News");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };
  const imageContentBlocks = [...contentBlocksNews].filter(
    (block) => block.typeHandle === "image"
  );

  const showAside =
    newsAssets?.length > 0 ||
    imageContentBlocks?.length > 0 ||
    releaseImages?.length > 0 ||
    releaseVideos?.length > 0 ||
    postTags?.length > 0;

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Hero data={hero?.length > 0 ? hero : makeReleaseHero(releaseImages)} />
      <Styled.NewsDetail $showAside={showAside}>
        {data && <NewsArticle data={data} />}
        {showAside && (
          <NewsAside
            newsAssets={newsAssets}
            contentBlockAssets={imageContentBlocks}
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
    </Body>
  );
}

NewsPage.displayName = "Template.NewsPage";

NewsPage.propTypes = {
  data: PropTypes.object,
};
