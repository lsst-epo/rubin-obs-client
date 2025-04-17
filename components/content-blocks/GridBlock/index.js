import clsx from "clsx";
import PropTypes from "prop-types";
import Container from "@rubin-epo/epo-react-lib/Container";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import { isDarkMode } from "@/helpers/styles";
import { mixedLinkShape } from "@/shapes/link";
import CTAGrid from "./CTAGrid";
import ImageGrid from "./ImageGrid";
import MainGrid from "./MainGrid";
import NewsGrid from "./NewsGrid";
import CarouselGrid from "./CarouselGrid";
import InvestigationGrid from "./InvestigationGrid";
import styles from "./styles.module.css";

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
  backgroundColor,
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
    <Container
      darkMode={isDarkMode(backgroundColor)}
      bgColor={backgroundColor || undefined}
      width={containerWidth}
    >
      <div>
        {header && (
          <h2
            className={clsx(
              styles.header,
              typeHandle === "investigationGrid" ? "t-align-center" : undefined
            )}
            data-has-border={
              typeHandle === "relatedContent" || typeHandle === "staffGrid"
            }
          >
            {header}
          </h2>
        )}
        <ContentGrid
          items={items}
          limit={limit}
          listTypeId={listTypeId}
          sectionHandle={typeHandle}
          pageId={pageId}
        />
        {mixedLink?.url && (
          <MixedLink
            {...mixedLink}
            params={pathParams}
            className={clsx(styles.link, "c-buttonish", "c-buttonish--block")}
          />
        )}
      </div>
    </Container>
  );
}

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
  backgroundColor: PropTypes.string,
};
