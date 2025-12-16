import PropTypes from "prop-types";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import NewsHero from "../NewsPage/NewsHero";
import RubinBasicsArticle from "./Article";
import RubinBasicsList from "@/dynamic/RubinBasicsList";
import MediaAside from "@/components/organisms/MediaAside";
import * as Styled from "../NewsPage/styles";
import { useTranslation } from "@/lib/i18n";
import { getGlobalData } from "@/lib/api/globals";
import { getLocale } from "next-intl/server";

export default async function RubinBasicsPage({ data }) {
  const {
    contentBlocksNews: contentBlocksRubinBasics = [],
    hero = [],
    focalPointX,
    focalPointY,
    heroCaption,
    id,
    newsAssets: rubinBasicAssets,
    postTags,
    title,
    uri,
    images: releaseImages,
    videos: releaseVideos,
  } = data;

  const locale = await getLocale();
  const { t } = await useTranslation(locale);

  const { rootPages } = await getGlobalData(locale);
  const customBreadcrumbs = rootPages
    .filter((p) => p.header?.includes("Explore"))
    .map((p) => p.pageEntry)
    .flat(1);

  // Unfortunate hard-coding of intermediary breadcrumb here due to forced nesting of feed page
  customBreadcrumbs.push({
    id: 9999, // Abitrary key value
    title: "Rubin Basics",
    uri: "explore/rubin-basics",
  });

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
  const mediaContentBlocks = [...contentBlocksRubinBasics].filter(
    (block) => block.typeHandle === "image" || block.typeHandle === "video"
  );

  if (rubinBasicAssets !== undefined && rubinBasicAssets.length > 0) {
    rubinBasicAssets.forEach((a, i) => {
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
  }

  // If there is a hero then combine it with the content block media assets
  if (heroBlock) mediaContentBlocks.unshift(heroBlock);

  // Only show the aside if there are news assets
  const showAside =
    manualAssets?.length > 0 ||
    mediaContentBlocks?.length > 0 ||
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
        {data && <RubinBasicsArticle data={data} hero={hero[0]} />}
        {showAside && (
          <MediaAside
            manualAssets={manualAssets}
            contentBlockAssets={mediaContentBlocks}
            releaseVideos={releaseVideos}
            tags={postTags}
            pathForTagSearch={{ uri: "/explore/rubin-basics" }}
          />
        )}
      </Styled.NewsDetail>
      <RubinBasicsList
        button={{
          text: t(`rubin-basics.back-to-posts`),
          uri: `${rootHomeLink?.uri}`,
        }}
        excludeId={id}
        header={t(`rubin-basics.related-posts`)}
        limit={3}
        isWide
        gridType="pages"
        isRelatedList
      />
    </>
  );
}

RubinBasicsPage.displayName = "Template.RubinBasicsPage";

RubinBasicsPage.propTypes = {
  data: PropTypes.object,
};
