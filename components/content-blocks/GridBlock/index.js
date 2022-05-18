import PropTypes from "prop-types";
import styled from "styled-components";
import Container from "@/layout/Container";
import MixedLink from "@/atomic/MixedLink";
import { mixedLinkShape } from "@/shapes/link";
import CTAGrid from "./CTAGrid";
import MainGrid from "./MainGrid";
import NewsGrid from "./NewsGrid";
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
    news: NewsGrid,
    investigationGrid: InvestigationGrid,
  };

  const widthMap = {
    ctaGrid: undefined,
    news: undefined,
    investigationGrid: "regular",
  };

  const ContentGrid = gridMap[typeHandle] || MainGrid;
  const containerWidth = widthMap[typeHandle] || undefined;

  return (
    <Container width={containerWidth}>
      <div>
        <Header
          className={
            typeHandle === "investigationGrid" ? "t-align-center" : undefined
          }
          addBorder={typeHandle === "relatedContent"}
        >
          {header}
        </Header>
        <ContentGrid
          items={items}
          limit={limit}
          listTypeId={listTypeId}
          sectionHandle={typeHandle}
          pageId={pageId}
          ifHeader={ifHeader}
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
    p.addBorder &&
    `padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 10px solid var(--turquoise55);`}
`;

const StyledMixedLink = styled(MixedLink)`
  margin-top: ${fluidScale("95px", "40px")};
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
