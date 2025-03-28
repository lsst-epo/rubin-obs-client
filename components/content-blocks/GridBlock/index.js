"use client";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, MixedLink } from "@rubin-epo/epo-react-lib";
import { mixedLinkShape } from "@/shapes/link";
import CTAGrid from "./CTAGrid";
import ImageGrid from "./ImageGrid";
import MainGrid from "./MainGrid";
import NewsGrid from "./NewsGrid";
import CarouselGrid from "./CarouselGrid";
import { fluidScale } from "@/styles/globalStyles";
import InvestigationGrid from "./InvestigationGrid";

function getLimit(numberOfItems) {
  switch (numberOfItems) {
    // due to a mistaken default value in the CMS,
    // we treat "all" as === "none"
    case "all":
    case "none":
      return 0;
    default:
      return parseInt(numberOfItems) || null;
  }
}

export default function GridBlock({
  numberOfItems,
  postType,
  header,
  items = [],
  mixedLink,
  pageId,
  typeHandle,
}) {
  const listTypeId = postType?.[0]?.id;
  const pathParams = listTypeId && { filter: listTypeId };
  const limit = getLimit(numberOfItems);

  const gridMap = {
    ctaGrid: CTAGrid,
    imageGrid: ImageGrid,
    news: NewsGrid,
    investigationGrid: InvestigationGrid,
    relatedContent: CarouselGrid,
  };

  const widthMap = {
    ctaGrid: undefined,
    imageGrid: undefined,
    news: undefined,
    investigationGrid: "regular",
  };

  const ContentGrid = gridMap[typeHandle] || MainGrid;
  const containerWidth = widthMap[typeHandle] || undefined;

  return (
    <Container width={containerWidth}>
      <div>
        {header && (
          <Header
            className={
              typeHandle === "investigationGrid" ? "t-align-center" : undefined
            }
            $addBorder={
              typeHandle === "relatedContent" || typeHandle === "staffGrid"
            }
          >
            {header}
          </Header>
        )}
        <ContentGrid
          items={items}
          limit={limit}
          listTypeId={listTypeId}
          sectionHandle={typeHandle}
          pageId={pageId}
        />
        {mixedLink?.url && (
          <StyledMixedLink
            {...mixedLink}
            params={pathParams}
            className="c-buttonish c-buttonish--block"
          />
        )}
      </div>
    </Container>
  );
}

const Header = styled.h2`
  margin-bottom: ${fluidScale("100px", "60px")};

  ${(p) =>
    p.$addBorder &&
    `padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 10px solid var(--turquoise85);`}
`;

const StyledMixedLink = styled(MixedLink)`
  margin-top: 40px;
`;

GridBlock.displayName = "ContentBlock.GridBlock";

GridBlock.propTypes = {
  typeHandle: PropTypes.string,
  numberOfItems: PropTypes.string,
  postType: PropTypes.array,
  ctas: PropTypes.array,
  items: PropTypes.array,
  header: PropTypes.string,
  mixedLink: mixedLinkShape,
  plainText: PropTypes.string,
  pageId: PropTypes.string,
};
