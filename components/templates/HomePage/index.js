import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Hero from "@/page/Hero";
import { Buttonish, MixedLink } from "@rubin-epo/epo-react-lib";
import { makeDateString, makeTruncatedString } from "@/lib/utils";
import { SlideBlock } from "@/components/content-blocks";
import Tabs from "@/components/layout/Tabs";
import TempList from "@/components/dynamic/TempList";
import * as Styled from "./styles";

export default function HomePage({
  data: {
    contentBlocks,
    customHero,
    description,
    hero,
    focalPointX,
    focalPointY,
    id,
    newsEntry,
    title,
  },
}) {
  const { t } = useTranslation();
  const bodyProps = {
    description,
    title,
  };

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
    <Body {...bodyProps}>
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
                <div>{makeTruncatedString(altTeaser, 30)}</div>
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
            <Hero data={hero} {...{ focalPointX, focalPointY }} />
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
    </Body>
  );
}

HomePage.displayName = "Template.HomePage";

HomePage.propTypes = {
  data: PropTypes.object,
};
