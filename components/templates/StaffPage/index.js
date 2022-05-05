import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import Body from "@/global/Body";
import { Share } from "@/content-blocks";
import StaffList from "@/dynamic/StaffList";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import NestedContext from "@/contexts/Nested";
import Image from "@/atomic/Image";
import Breadcrumbs from "@/page/Breadcrumbs";
import * as Styled from "./styles";

function getParentUri(uri) {
  const pathFragments = uri.split("/");
  return pathFragments.slice(0, -1).join("/");
}

function getParentRootPage(parentUri, rootPages) {
  return rootPages.find((page) => {
    return page.pageEntry?.[0].uri.includes(parentUri);
  });
}

function getParentEntry(parentUri, rootPages) {
  const parentRootPage = getParentRootPage(parentUri, rootPages);
  return parentRootPage?.pageEntry?.[0];
}

export default function StaffPage({
  data: {
    featuredImage = [],
    id,
    uri,
    title,
    bio,
    heroImage = [],
    tradingCard = [],
    quote,
    tags = [],
    contentBlocks,
  },
}) {
  const { t } = useTranslation();
  const rootPages = useGlobalData("rootPages");
  const parentUri = getParentUri(uri);
  const parentEntry = getParentEntry(parentUri, rootPages);
  const bodyProps = {
    featuredImage,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };
  const breadcrumbs = [parentEntry, pageLink].filter(Boolean);

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Styled.Hero data={heroImage}>
        {quote && (
          <Styled.QuotePositioner>
            <Styled.Quote>
              <Styled.QuoteInner dangerouslySetInnerHTML={{ __html: quote }} />
            </Styled.Quote>
          </Styled.QuotePositioner>
        )}
      </Styled.Hero>
      <Styled.Layout $hasHero={!!heroImage?.[0]}>
        <Styled.Main>
          <NestedContext.Provider value={true}>
            <h1>{title}</h1>{" "}
            <Styled.Bio
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
            <Share />
            {!!contentBlocks?.length &&
              contentBlocks.map((block) => (
                <ContentBlockFactory
                  key={block.id}
                  type={block.typeHandle}
                  data={block}
                  pageId={id}
                />
              ))}
          </NestedContext.Provider>
        </Styled.Main>
        <Styled.Aside>
          {tradingCard?.[0] && (
            <section>
              <Styled.SectionHeading>
                {t("staff.trading-card")}
              </Styled.SectionHeading>
              <Image image={tradingCard[0]} />
            </section>
          )}
          {!!tags?.length && (
            <section>
              <Styled.SectionHeading>{t(`tags`)}</Styled.SectionHeading>
              <Styled.TagList>
                {tags.map(({ id, slug, title }) => (
                  <Styled.Tag key={id}>
                    <Link
                      href={{
                        pathname: `/${parentEntry?.uri || parentUri}`,
                        query: { search: slug },
                      }}
                      passHref
                    >
                      <Styled.Link>{title}</Styled.Link>
                    </Link>
                  </Styled.Tag>
                ))}
              </Styled.TagList>
            </section>
          )}
        </Styled.Aside>
      </Styled.Layout>
      <StaffList
        excludeId={id}
        header={t(`staff.browse-more`)}
        limit={4}
        button={{
          text: t(`staff.back-to-profiles`),
          uri: parentEntry?.uri || parentUri,
        }}
        isWide={true}
      />
    </Body>
  );
}

StaffPage.displayName = "Template.StaffPage";

StaffPage.propTypes = {
  data: PropTypes.object,
};
