import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Hero from "@/page/Hero";
import { respond } from "@/styles/globalStyles";
import Buttonish from "@/components/primitives/Buttonish";
import { makeDateString, makeTruncatedString } from "@/lib/utils";
import { SlideBlock } from "@/components/content-blocks";
import Tabs from "@/components/layout/Tabs";
import TempList from "@/components/dynamic/TempList";
import MixedLink from "@/components/primitives/MixedLink";

export default function HomePage({
  data: { contentBlocks, customHero, description, hero, id, newsEntry, title },
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
        <HeroWrapper>
          {altFlag && <Flag>{altFlag}</Flag>}
          <StyledNewsHero>
            <Hero data={altHero} />
          </StyledNewsHero>
          <HeroContent>
            {!custom && news?.postType?.[0] && (
              <h4>{t(`news.${news.postType[0].slug}`)}</h4>
            )}
            <h1>{altHeader}</h1>
            <Details>
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
            </Details>
          </HeroContent>
        </HeroWrapper>
      ) : (
        <HeroWrapper>
          <StyledHero>
            <Hero data={hero} />
          </StyledHero>
          <HeroContent>
            <h1>{title}</h1>
            <Details>{description}</Details>
          </HeroContent>
        </HeroWrapper>
      )}
      {sliderArray.length > 0 && (
        <StyledTabs>
          <Tabs labels={labelMap}>{Sliders}</Tabs>
        </StyledTabs>
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

const HeroWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 50px 1fr;
  gap: 0px 0px;
  align-items: center;
  background-color: var(--black);
  ${respond(`grid-template-columns: 10% 90%;`)}
`;

const Flag = styled.h4`
  grid-area: 1 / 1 / 2 / 3;
  z-index: 1;
  background-color: var(--red40);
  color: var(--white);
  place-self: start;
  margin-left: 4vw;
  padding: 1em 2em;
`;

const StyledNewsHero = styled.div`
  border-top: 10px solid var(--red40);
  grid-area: 1 / 1 / 3 / 3;
  > div:first-child img {
    filter: brightness(50%) grayscale(30%) sepia(60%) hue-rotate(320deg);
    ${respond(`min-height: 75vh;`)}
  }
`;

const StyledHero = styled.div`
  grid-area: 1 / 1 / 3 / 3;

  img {
    ${respond(`min-height: 50vh;`)}
  }
`;

const HeroContent = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  z-index: 1;
  padding-right: 2vw;
  padding-bottom: 2em;
  max-width: 40em;
  color: var(--white);
  text-shadow: 0px 0px 6px var(--black);
  a {
    text-shadow: none;
  }
  ${respond(`align-self: end;
    padding-bottom: 110px;`)}
`;

const Details = styled.div`
  a {
    margin-top: 1em;
  }
  ${respond(`span {display: none;}`)}
`;

const StyledTabs = styled.div`
  position: relative;
  top: -60px;
  ${respond(`top: -80px;`)}
`;

HomePage.displayName = "Template.HomePage";

HomePage.propTypes = {
  data: PropTypes.object,
};
