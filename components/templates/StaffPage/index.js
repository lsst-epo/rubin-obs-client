import PropTypes from "prop-types";
import { getLocale } from "@/lib/i18n/server";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import getRootPages from "@/services/craft/globals/rootPages";
import { Share } from "@/content-blocks";
import StaffList from "@/dynamic/StaffList";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { NestedProvider } from "@/contexts/Nested";
import Image from "@rubin-epo/epo-react-lib/Image";
import Breadcrumbs from "@/page/Breadcrumbs";
import PageContent from "@/page/PageContent";
import Aside from "@/components/molecules/Aside";
import AsideSection from "@/components/molecules/Aside/Section";
import TagList from "@/components/molecules/TagList";
import * as Styled from "./styles";

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

export default async function StaffPage({
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
  const {
    t,
    i18n: { language },
  } = await useTranslation(getLocale());
  const rootPages = await getRootPages();
  const parentUri = getParentUri(uri);
  const parentEntry = getParentEntry(rootPages);

  const pageLink = {
    id,
    uri,
    title,
  };
  const breadcrumbs = [parentEntry, pageLink].filter(Boolean);
  const tagsWithLinks = tags.map(({ slug, title }) => {
    return {
      name: title,
      destination: addLocaleUriSegment(
        language,
        `/${parentEntry?.uri}?search=${slug}`
      ),
    };
  });

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
          <Aside>
            {tradingCard?.[0] && (
              <Styled.TradingCardSection title={t("staff.trading-card")}>
                <Styled.TradingCardLink href={tradingCard[0].url3x} download>
                  <Image image={tradingCard[0]} />
                </Styled.TradingCardLink>
              </Styled.TradingCardSection>
            )}
            <AsideSection title={t("tags")}>
              <TagList tags={tagsWithLinks} />
            </AsideSection>
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
        <NestedProvider value={!!heroImage?.length}>
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
        </NestedProvider>
      </PageContent>
    </>
  );
}

StaffPage.displayName = "Template.StaffPage";

StaffPage.propTypes = {
  data: PropTypes.object,
};
