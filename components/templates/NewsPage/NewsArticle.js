import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/lib/utils";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Container } from "@rubin-epo/epo-react-lib";
import { Share } from "@/content-blocks";
import Contacts from "./Contacts";
import * as Styled from "./styles";

export default function NewsArticle({ data }) {
  const {
    contentBlocksNews = [],
    date,
    description,
    releaseDescription,
    id,
    title,
    pressReleaseId,
    subtitle,
    contacts,
    links,
    /* eslint-disable camelcase */
    more_information: moreInformation,
    release_date: releaseDate,
    /* eslint-enable camelcase */
    headline,
    releaseUrl,
  } = data;

  const { t } = useTranslation();
  const localizedDate = useDateString(date || releaseDate);

  return (
    <article>
      <Container paddingSize="medium">
        <div>
          <h1>{title}</h1>
          {/* only a subtitle if isNoirlabRelease */}
          {subtitle && (
            <Styled.SubtitleSecondary>{subtitle}</Styled.SubtitleSecondary>
          )}
          <Styled.Pretitle className="t-heading-quaternary">
            {localizedDate}
          </Styled.Pretitle>
          <Styled.Subtitle>{description || headline}</Styled.Subtitle>
        </div>
      </Container>
      <Share />
      {/* only a releaseDescription if isNoirlabRelease */}
      {releaseDescription && (
        <div
          dangerouslySetInnerHTML={{ __html: releaseDescription }}
          className="c-content-rte"
        />
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
        <>
          <Styled.ArticleHeading>{t(`news.more-info`)}</Styled.ArticleHeading>
          {moreInformation && (
            <div
              dangerouslySetInnerHTML={{ __html: moreInformation }}
              className="c-content-rte"
            />
          )}
          <div className="c-content-rte">
            <Link prefetch={false} href={releaseUrl}>
              {t(`news.release-link`)}
            </Link>
          </div>
        </>
      )}
      {/* only a headline if isNoirlabRelease */}
      {links && (
        <>
          <Styled.ArticleHeading>{t(`news.links`)}</Styled.ArticleHeading>
          <div
            dangerouslySetInnerHTML={{ __html: links }}
            className="c-content-rte"
          />
        </>
      )}
      {/* only a headline if isNoirlabRelease */}
      {contacts && <Contacts contacts={contacts} />}
    </article>
  );
}

NewsArticle.propTypes = {
  data: PropTypes.object,
};
