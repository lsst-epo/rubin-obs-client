"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import { Share } from "@/content-blocks";
import StaffList from "@/dynamic/StaffList";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import NestedContext from "@/contexts/Nested";
import { Image } from "@rubin-epo/epo-react-lib";
import Breadcrumbs from "@/page/Breadcrumbs";
import PageContent from "@/page/PageContent";
import * as Styled from "./styles";
import Aside from "@/components/page/Aside";

function getParentUri(uri) {
  const pathFragments = uri.split("/");
  return pathFragments.slice(0, -1).join("/");
}

function getParentEntry(rootPages) {
  const parentRootPage = rootPages.find((page) => {
    return page.header === "Staff Profiles";
  });
  return parentRootPage?.pageEntry?.[0];
}

export default function StaffPage({
  data: {
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
  const parentEntry = getParentEntry(rootPages);

  const pageLink = {
    id,
    uri,
    title,
  };
  const breadcrumbs = [parentEntry, pageLink].filter(Boolean);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageContent
        overlapHero={!!heroImage?.length}
        heroImage={heroImage}
        innerHero={
          quote && (
            <Styled.QuotePositioner>
              <Styled.Quote>
                <Styled.QuoteInner
                  dangerouslySetInnerHTML={{ __html: quote }}
                />
              </Styled.Quote>
            </Styled.QuotePositioner>
          )
        }
        sidebar={
          <Aside
            rootHomeLink={{ uri: parentUri, ...parentEntry }}
            {...{ tags }}
          >
            {tradingCard?.[0] && (
              <Styled.TradingCardSection title={t("staff.trading-card")}>
                <Styled.TradingCardLink href={tradingCard[0].url3x} download>
                  <Image image={tradingCard[0]} />
                </Styled.TradingCardLink>
              </Styled.TradingCardSection>
            )}
          </Aside>
        }
        footer={
          <StaffList
            excludeId={id}
            header={t(`staff.browse-more`)}
            limit={4}
            button={{
              text: t(`staff.back-to-profiles`),
              uri: parentEntry?.uri || parentUri,
            }}
            isWide
            isRelatedList
          />
        }
      >
        <NestedContext.Provider value={!!heroImage?.length}>
          <h1>{title}</h1>{" "}
          <Styled.Bio
            className="c-content-rte"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
          <Share />
          {!!contentBlocks?.length &&
            contentBlocks.map((block) => {
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
        </NestedContext.Provider>
      </PageContent>
    </>
  );
}

StaffPage.displayName = "Template.StaffPage";

StaffPage.propTypes = {
  data: PropTypes.object,
};
