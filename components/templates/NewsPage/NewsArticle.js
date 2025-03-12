"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useResizeObserver from "use-resize-observer";
import { makeDateString } from "@/helpers/dates";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Share } from "@/content-blocks";
import Contacts from "./Contacts";
import * as Styled from "./styles";

export default function NewsArticle({ data }) {
  const {
    contentBlocksNews = [],
    date,
    heroCaption,
    description,
    releaseDescription,
    title,
    id,
    pressReleaseId,
    subtitle,
    contacts,
    links,
    moreInformation,
    headline,
    releaseUrl,
  } = data;

  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation();
  const localizedDate = makeDateString(date, { locale: resolvedLanguage });
  const { ref } = useResizeObserver({
    box: "border-box",
    onResize: ({ height }) => {
      document.documentElement.style.setProperty(
        "--Hero-caption-offset",
        `-${height}px`
      );
    },
  });

  return (
    <Styled.Article>
      <Container paddingSize="medium">
        <div>
          {heroCaption && (
            <Styled.HeroCaption
              ref={ref}
              dangerouslySetInnerHTML={{ __html: heroCaption }}
              aria-hidden
            />
          )}
          <h1>{title}</h1>
          {/* only a subtitle if isNoirlabRelease */}
          {subtitle && (
            <Styled.SubtitleSecondary>{subtitle}</Styled.SubtitleSecondary>
          )}
          <Styled.Pretitle dateTime={date} className="t-heading-quaternary">
            {localizedDate}
          </Styled.Pretitle>
          <Styled.Subtitle>{description || headline}</Styled.Subtitle>
        </div>
      </Container>
      <Share />
      {/* only a releaseDescription if isNoirlabRelease */}
      {releaseDescription && (
        <Container paddingSize="medium">
          <div
            data-cy="press-release-text"
            dangerouslySetInnerHTML={{ __html: releaseDescription }}
            className="c-content-rte"
          />
        </Container>
      )}

      {!pressReleaseId &&
        contentBlocksNews.length > 0 &&
        [...contentBlocksNews].map((block) => {
          if (!block.id || !block.typeHandle) return null;
          return (
            <ContentBlockFactory
              key={block.id}
              type={block.typeHandle}
              data={block}
              pageId={id}
            />
          );
        })}
      {/* only a headline if isNoirlabRelease */}
      {(moreInformation || releaseUrl) && (
        <Container paddingSize="medium">
          <Styled.ArticleHeading>{t(`news.more-info`)}</Styled.ArticleHeading>
          {moreInformation && (
            <div
              dangerouslySetInnerHTML={{ __html: moreInformation }}
              className="c-content-rte"
            />
          )}
          <div className="c-content-rte">
            <a href={releaseUrl} target="_blank" rel="noopener noreferrer">
              {t(`news.release-link`)}
            </a>
          </div>
        </Container>
      )}
      {/* only a headline if isNoirlabRelease */}
      {links && (
        <Container paddingSize="medium">
          <Styled.ArticleHeading>{t(`news.links`)}</Styled.ArticleHeading>
          <div
            dangerouslySetInnerHTML={{ __html: links }}
            className="c-content-rte"
          />
        </Container>
      )}
      {/* only contacts if isNoirlabRelease */}
      {contacts && (
        <Container paddingSize="medium">
          <Contacts contacts={contacts} />
        </Container>
      )}
    </Styled.Article>
  );
}

NewsArticle.propTypes = {
  data: PropTypes.object,
};
