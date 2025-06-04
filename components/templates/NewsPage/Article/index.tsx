import { FC } from "react";
import { NewsArticle } from "schema-dts";
import clsx from "clsx";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import Container from "@rubin-epo/epo-react-lib/Container";
import { ImageMini } from "@/services/noirlab";
import { getOrganizationData } from "@/services/craft/globals/organization";
import { useTranslation } from "@/lib/i18n";
import { striptags } from "@/lib/utils/strings";
import { makeDateString } from "@/helpers/dates";
import StructuredData from "@/components/atomic/StructuredData";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import Contacts from "../Contacts";
import * as Styled from "../styles";
import { getPathname } from "@/lib/i18n/navigation";
import { env } from "@/env";
import styles from "./styles.module.css";

interface ArticleData extends Record<string, any> {
  date: string;
  dateUpdated: string;
  uri: string;
  releaseImages?: Array<ImageMini>;
  contentBlocksNews: Array<any>;
}

interface ArticleProps {
  data: ArticleData;
  hero?: ImageShape;
}

const Article: FC<ArticleProps> = async ({ data, hero }) => {
  const {
    uri,
    contentBlocksNews = [],
    date,
    dateUpdated,
    heroCaption,
    description,
    title,
    id,
    subtitle,
    contacts,
    postTags = [],
  } = data;

  const {
    i18n: { language: locale },
  } = await useTranslation();
  const organization = await getOrganizationData();
  const localizedDate = makeDateString(date, { locale });
  const path = getPathname({
    href: { pathname: `/${uri}` },
    locale,
  });
  const url = new URL(path, env.NEXT_PUBLIC_BASE_URL).toString();

  const articleBody = contentBlocksNews.reduce((prev, { typeHandle, text }) => {
    if (typeHandle === "text") {
      return (prev += striptags(text));
    }

    return prev;
  }, "");

  const metadata: NewsArticle = {
    "@type": "NewsArticle",
    headline: title,
    author: organization,
    url,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(dateUpdated).toISOString(),
    image: hero?.url,
    description: description || subtitle,
    articleBody,
    wordCount: articleBody.split(" ").length,
    keywords: postTags.map(({ title }) => title),
    inLanguage: locale,
    isAccessibleForFree: true,
    mainEntityOfPage: url,
  };

  return (
    <Styled.Article>
      <StructuredData jsonLd={metadata} id={id} />
      <Container paddingSize="medium">
        <div>
          {heroCaption && (
            <Styled.HeroCaption
              dangerouslySetInnerHTML={{ __html: heroCaption }}
              aria-hidden
            />
          )}
          <h1>{title}</h1>
          {/* only a subtitle if isNoirlabRelease */}
          {subtitle && (
            <div className={styles.subtitleSecondary}>{subtitle}</div>
          )}
          <time
            dateTime={date}
            className={clsx(styles.pretitle, "t-heading-quaternary")}
          >
            {localizedDate}
          </time>
          <div className={styles.subtitle}>{description}</div>
        </div>
      </Container>
      <Share {...{ locale }} />

      {contentBlocksNews.length > 0 &&
        contentBlocksNews.map((block) => {
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

      {/* only contacts if isNoirlabRelease */}
      {contacts && (
        <Container paddingSize="medium">
          <Contacts contacts={contacts} />
        </Container>
      )}
    </Styled.Article>
  );
};

export default Article;
