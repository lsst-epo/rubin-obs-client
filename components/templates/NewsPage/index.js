import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs, useDateString } from "@/lib/utils";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Container from "@/layout/Container";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/page/Breadcrumbs";
import Hero from "@/page/Hero";
import NewsList from "@/dynamic/NewsList";
import ResponsiveImage from "@/atomic/ResponsiveImage";
import IconComposer from "@/components/svg/IconComposer";
import {
  containerWide,
  containerFullBleed,
  respond,
} from "@/styles/globalStyles";

export default function NewsPage({
  data: {
    contentBlocksNews = [],
    date,
    description,
    featuredImage = [],
    hero = [],
    id,
    newsAssets,
    postType,
    postTags,
    title,
    uri,
  },
}) {
  const { t } = useTranslation();
  const localizedDate = useDateString(date);
  const bodyProps = {
    description,
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

  // This sets up the automatic media grabber -- if there are no manual media set
  let manualMedia = false;
  // This adds the document icon from the designs, if there is a text-style link near the start.
  let manualDoc = newsAssets.some(
    (a, i) => i < 4 && (a.textLink?.length > 0 || a.externalLink?.length > 0)
  );

  const MediaAssets = () => {
    const otherAssets = [...contentBlocksNews].filter(
      (block, i) => block.typeHandle === "image"
    );
    return otherAssets.length > 0 ? (
      <AsideSecondary>
        <h3>{t(`media`)}</h3>
        {otherAssets.map((asset, i) => {
          if (asset.image?.[0].url) {
            return (
              <Link key={i} href={asset.image?.[0].url}>
                <a>
                  <ResponsiveImage image={asset.image?.[0]} ratio="8:5" />
                </a>
              </Link>
            );
          }
        })}
      </AsideSecondary>
    ) : null;
  };

  const Tags = () => {
    return postTags.length > 0 ? (
      <AsideTags>
        <h3>{t(`tags`)}</h3>
        {postTags.map((tag, i) => {
          if (tag.slug) {
            return (
              <Link key={i} href={`/search?search=${tag.slug}`}>
                <a>{`#${tag.title}`}</a>
              </Link>
            );
          }
        })}
      </AsideTags>
    ) : null;
  };

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Hero data={hero} />
      <NewsDetail>
        <article>
          <Container>
            <div>
              <h1>{title}</h1>
              <Pretitle>{localizedDate}</Pretitle>
              <Subtitle>{description}</Subtitle>
            </div>
          </Container>
          <Share />
          {contentBlocksNews.length > 0 &&
            [...contentBlocksNews].map((block) => {
              return (
                <ContentBlockFactory
                  key={block.id}
                  type={block.typeHandle}
                  data={block}
                  pageId={id}
                />
              );
            })}
        </article>
        <Aside>
          {newsAssets?.length > 0 && (
            <AsidePrimary>
              {newsAssets.map((a, i) => {
                if (a.assetHeader) {
                  return (
                    <h3 key={i}>
                      {a.assetHeader}{" "}
                      {manualDoc === true && <IconComposer icon="Doc" />}
                    </h3>
                  );
                } else if (a.textLink?.length > 0) {
                  if (a.textLink[0].url) {
                    return (
                      <Link href={a.textLink[0].url} key={i}>
                        <a>{a.text}</a>
                      </Link>
                    );
                  }
                } else if (a.externalLink) {
                  manualDoc = true;
                  return (
                    <a
                      href={a.externalLink}
                      key={i}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.text}
                    </a>
                  );
                } else if (a.image?.length > 0) {
                  manualMedia = true;
                  return (
                    <a href={a.image[0].url} key={i}>
                      <ResponsiveImage image={a.image[0]} />
                    </a>
                  );
                } else if (a.galleryItem?.length > 0) {
                  manualMedia = true;
                  if (a.galleryItem[0].uri) {
                    return (
                      <Link href={`/${a.galleryItem[0].uri}`} key={i}>
                        <a>
                          <ResponsiveImage
                            image={
                              a.galleryItem[0].representativeAssetVariant[0]
                            }
                          />
                        </a>
                      </Link>
                    );
                  }
                }
              })}
            </AsidePrimary>
          )}

          {!manualMedia && <MediaAssets />}
          {postTags && <Tags />}
        </Aside>
      </NewsDetail>
      <NewsList
        button={{
          text: t(`news.back-to-posts`),
          uri: `${rootHomeLink?.uri}`,
        }}
        excludeId={id}
        header={t(`news.related-posts`)}
        limit={3}
        isWide={true}
        gridType="pages"
      />
    </Body>
  );
}

const NewsDetail = styled.div`
  ${containerFullBleed("CONTAINER_REGULAR")}
  display: grid;
  grid-template-columns: minmax(75%, 1fr) minmax(25%, 250px);
  ${respond(`${containerWide()}`, "1360px")}
  ${respond(`grid-template-columns: 1fr;`)}
  article > section > div {
    padding-left: 0;
    margin-left: 0;
    ${respond(`max-width: 94vw;`, "720px")}
  }
`;

const Pretitle = styled.h4`
  padding-bottom: 10px;
`;

const Subtitle = styled.div`
  padding-top: 10px;
`;

const Aside = styled.aside`
  padding: 100px 0;
  ${respond(`display: none;`)}

  h3 {
    position: relative;
    padding-right: 32px;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 8px solid var(--neutral15);
    svg {
      display: none;
    }
  }

  a {
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: var(--turquoise60);
    margin: 10px 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AsidePrimary = styled.div`
  h3 {
    &:first-of-type {
      border-bottom: 8px solid var(--turquoise60);
      svg {
        display: block;
        position: absolute;
        top: 4px;
        right: 0;
        background-color: var(--turquoise60);
        border-radius: 50%;
        padding: 8px;
        width: 32px;
        height: 32px;
        fill: var(--white);
        overflow: visible;
      }
    }
  }
`;

const AsideSecondary = styled.div`
  margin-top: 1em;
`;

const AsideTags = styled.div`
  margin-top: 1em;
  a {
    display: inline-block;
    margin-right: 6px;
  }
`;

NewsPage.displayName = "Template.NewsPage";

NewsPage.propTypes = {
  data: PropTypes.object,
};
