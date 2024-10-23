import PropTypes from "prop-types";
import truncate from "lodash/truncate";
import { damAssetToImage } from "@/lib/canto";
import { useTranslation } from "@/lib/i18n";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Hero from "@/components/molecules/Hero";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import { makeDateString } from "@/lib/utils/dates";
import { SlideBlock } from "@/components/content-blocks";
import Tabs from "@/components/layout/Tabs";
import TempList from "@/components/dynamic/TempList";
import * as Styled from "./styles";

export default async function HomePage({
  data: {
    contentBlocks,
    customHero,
    description,
    hero,
    cantoHero,
    focalPointX,
    focalPointY,
    id,
    newsEntry,
    title,
  },
  locale,
}) {
  const { t } = await useTranslation(locale);

  // HERO AREA
  // If there is a newsEntry or customHero, display alternate hero area
  const news = newsEntry?.[0];
  const custom = customHero?.[0];
  const isAlternate = news || custom;

  const altFlag = custom?.flag || t(`breaking-news`);
  const altHero =
    (custom?.image?.length > 0 && custom?.image) ||
    (news?.hero?.length > 0 && news?.hero) ||
    hero;
  const altHeader = custom?.header || news?.title;
  const altTeaser = custom?.teaser || news?.teaser;

  // CONTENT BLOCKS
  // remove any stray empty blocks
  const finalContentBlocks = contentBlocks.filter(
    (block) => Object.keys(block).length !== 0
  );

  // if the first three blocks are sliders...
  let sliderArray = [];
  let Sliders;
  let sliderLabels;
  const icons = ["video", "info", "team"];
  let labelMap;
  if (
    finalContentBlocks?.[0]?.typeHandle === "slideBlock" &&
    finalContentBlocks?.[1]?.typeHandle === "slideBlock" &&
    finalContentBlocks?.[2]?.typeHandle === "slideBlock"
  ) {
    sliderArray = finalContentBlocks.splice(0, 3);
    Sliders = sliderArray.map((slider, i) =>
      slider.dynamicComponent === "telescopeStatus" ? (
        <TempList key={i} {...slider} />
      ) : (
        <SlideBlock
          key={i}
          {...slider}
          tileType={
            slider.dynamicComponent?.includes("staff")
              ? "darkSlideStaff"
              : "darkSlide"
          }
          truncate={50}
        />
      )
    );
    sliderLabels = sliderArray.map((slider) => slider.header);
    labelMap = Object.assign(
      ...sliderLabels.map((k, i) => ({ [icons[i]]: k }))
    );
  }

  return (
    <>
      {isAlternate ? (
        <Styled.HeroWrapper>
          {altFlag && <Styled.Flag>{altFlag}</Styled.Flag>}
          <Styled.NewsHero>
            <Hero data={altHero} {...{ focalPointX, focalPointY }} />
          </Styled.NewsHero>
          <Styled.HeroContent>
            {!custom && news?.postType?.[0]?.title && (
              <h4>{news.postType[0].title}</h4>
            )}
            <h1>{altHeader}</h1>
            <Styled.Details>
              <span>
                {!custom && news?.date && <h4>{makeDateString(news.date)}</h4>}
                <div>{truncate(altTeaser, 30)}</div>
              </span>
              {custom?.mixedLink?.element || custom?.mixedLink?.url ? (
                <MixedLink {...custom.mixedLink} className="c-buttonish" />
              ) : news?.uri ? (
                <Buttonish
                  text={t(`read-more`)}
                  url={`/${news.uri}`}
                ></Buttonish>
              ) : null}
            </Styled.Details>
          </Styled.HeroContent>
        </Styled.HeroWrapper>
      ) : (
        <Styled.HeroWrapper>
          <Styled.HeroContainer>
            <Hero
              data={
                cantoHero?.length > 0
                  ? [damAssetToImage(locale, cantoHero[0])]
                  : hero
              }
              {...{ focalPointX, focalPointY }}
            />
          </Styled.HeroContainer>
          <Styled.HeroContent>
            <h1>{title}</h1>
            <Styled.Details>{description}</Styled.Details>
          </Styled.HeroContent>
        </Styled.HeroWrapper>
      )}
      {sliderArray.length > 0 && (
        <Styled.TabsContainer>
          <Tabs labels={labelMap}>{Sliders}</Tabs>
        </Styled.TabsContainer>
      )}
      {[...finalContentBlocks].map((block) => {
        return (
          <ContentBlockFactory
            key={block.id}
            type={block.typeHandle}
            data={block}
            pageId={id}
          />
        );
      })}
    </>
  );
}

HomePage.displayName = "Template.HomePage";

HomePage.propTypes = {
  data: PropTypes.object,
  locale: PropTypes.string.isRequired,
};
