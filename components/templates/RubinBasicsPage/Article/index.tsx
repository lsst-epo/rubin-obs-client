import { FC } from "react";
import { NewsArticle } from "schema-dts";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import Container from "@rubin-epo/epo-react-lib/Container";
import { getOrganizationData } from "@/services/craft/globals/organization";
import { useTranslation } from "@/lib/i18n";
import { striptags } from "@/lib/utils/strings";
import StructuredData from "@/components/atomic/StructuredData";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import * as Styled from "../../NewsPage/styles";
import { getPathname } from "@/lib/i18n/navigation";
import { env } from "@/env";
import styles from "./styles.module.css";

interface ArticleData extends Record<string, any> {
  date: string;
  dateUpdated: string;
  uri: string;
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
    heroCaption,
    description,
    title,
    id,
    subtitle,
    postTags = [],
  } = data;

  const {
    i18n: { language: locale },
  } = await useTranslation();
  const organization = await getOrganizationData();
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
    </Styled.Article>
  );
};

export default Article;
