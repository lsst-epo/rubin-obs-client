import { FC } from "react";
import { useTranslation } from "@/lib/i18n";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Hero from "@/components/molecules/Hero";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import { makeTruncatedString } from "@/lib/utils/strings";
import { makeDateString } from "@/helpers/dates";
import { SlideBlock } from "@/components/content-blocks";
import Tabs from "@/components/layout/Tabs";
import TempList from "@/components/dynamic/TempList";
import styles from "./styles.module.css";

interface HomePageProps {
  data: any;
  locale: string;
}

const HomePage: FC<HomePageProps> = async ({
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
  locale,
}) => {
  const { t } = await useTranslation(locale);

  // HERO AREA
  // If there is a newsEntry or customHero, display alternate hero area
  const news = newsEntry?.[0];
  const custom = customHero?.[0];
  const hasHero = !!hero[0] || !!news || !!custom;
  const isAlternate = hasHero && (news || custom);

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
  let sliderArray: Array<any> = [];
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
    labelMap = { ...sliderLabels.map((k, i) => ({ [icons[i]]: k })) };
  }
  // console.info("logging finalContentBlocks", finalContentBlocks);

  return (
    <>
      {hasHero && (
        <>
          {" "}
          {isAlternate ? (
            <div className={styles.heroWrapper}>
              {altFlag && <h4 className={styles.flag}>{altFlag}</h4>}
              <div className={styles.newsHero}>
                <Hero data={altHero} {...{ focalPointX, focalPointY }} />
              </div>
              <div className={styles.heroContent}>
                {!custom && news?.postType?.[0]?.title && (
                  <h4>{news.postType[0].title}</h4>
                )}
                <h1>{altHeader}</h1>
                <div className={styles.details}>
                  <span>
                    {!custom && news?.date && (
                      <h4>{makeDateString(news.date)}</h4>
                    )}
                    <div>{makeTruncatedString(altTeaser, 30)}</div>
                  </span>
                  {custom?.mixedLink?.element || custom?.mixedLink?.url ? (
                    <MixedLink {...custom.mixedLink} className="c-buttonish" />
                  ) : news?.uri ? (
                    <Buttonish url={`/${news.uri}`}>{t(`read-more`)}</Buttonish>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.heroWrapper}>
              <div className={styles.heroContainer}>
                <Hero data={hero} {...{ focalPointX, focalPointY }} />
              </div>
              <div className={styles.heroContent}>
                <h1>{title}</h1>
                <div className={styles.details}>{description}</div>
              </div>
            </div>
          )}
        </>
      )}

      {sliderArray.length > 0 && (
        <div className={styles.tabsContainer}>
          <Tabs labels={labelMap}>{Sliders}</Tabs>
        </div>
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
};

HomePage.displayName = "Template.HomePage";

export default HomePage;
