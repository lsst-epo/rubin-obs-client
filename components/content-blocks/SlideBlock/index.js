import PropTypes from "prop-types";
import styled from "styled-components";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import Carousel from "@/components/layout/Carousel";
import Tile from "@/atomic/Tile";
import {
  makeTruncatedString,
  normalizeItemData,
  useListForBlock,
} from "@/lib/utils";
import MixedLink from "@/components/atomic/MixedLink";
import { mixedLinkShape } from "@/components/shapes/link";

const SlideBlock = ({
  header,
  items = [],
  truncate,
  limit = 5,
  listTypeId,
  mixedLink,
  pageId,
  dynamicComponent,
  section = dynamicComponent,
  tileType = "darkSlide",
  panelProps,
}) => {
  const { t } = useTranslation();

  // get manually-curated data first. This has some filtering for missing entries (deleted in craft)
  let allItems = [];
  if (dynamicComponent === "galleryItems") {
    allItems = normalizeItemData(items, "galleryEntry");
  } else if (dynamicComponent === "staffProfiles") {
    allItems = normalizeItemData(items, "staffEntry");
    truncate = 50;
  }

  const sectionMap = {
    newsPosts: "news",
    pressReleases: "news",
    nonScientificStaff: "staffProfiles",
    scientificStaff: "staffProfiles",
    relatedContent: "pages",
  };

  const { data, isLoading, isError } = useListForBlock({
    limit,
    listTypeId,
    section: sectionMap[section] || section,
    excludeId: pageId,
  }) || {
    data: {},
  };

  if (data?.entries) {
    // combine with curated items. Filter so no dupes.
    allItems = [
      ...allItems,
      ...data.entries.filter((item) => {
        // filter out empty objects
        if (!Object.keys(item).length) return false;
        return allItems.findIndex((obj) => obj?.id === item.id);
      }),
    ].slice(0, limit);
  }

  if (isLoading || isError) return null;

  // pretitle for slideshows and galleries
  const makePretitle = (cat, type) => {
    if (type === "slideshow") {
      return t(`gallery.slideshow`);
    } else if (type === "galleryItem") {
      return cat?.[0]?.slug
        ? t(`gallery.${cat[0].slug}`)
        : t(`gallery.gallery`);
    }
    return null;
  };

  return (
    <StyledContainer bgColor="black" width="regular" elAttributes={panelProps}>
      <HeaderBlock>
        <Header>{header}</Header>
        {(mixedLink?.element || mixedLink?.url) && (
          <StyledMixedLink {...mixedLink} />
        )}
      </HeaderBlock>
      <Carousel>
        {allItems.length > 0 &&
          allItems.map(
            ({
              id,
              description,
              image,
              galleryItemCategory,
              title,
              typeHandle,
              uri,
            }) => (
              <Tile
                key={id}
                image={image?.[0]}
                isFeature={true}
                link={uri}
                pretitle={makePretitle(galleryItemCategory, typeHandle)}
                text={
                  truncate
                    ? makeTruncatedString(striptags(description), truncate)
                    : striptags(description)
                }
                title={title}
                type={tileType}
              />
            )
          )}
      </Carousel>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  @media (max-width: 900px) {
    padding-bottom: 40px;
  }
`;

const HeaderBlock = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 40px;
  padding: 0.5rem 0;
  border-bottom: 6px solid var(--turquoise80);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    margin-bottom: 10px;
  }
`;

const Header = styled.h3`
  color: var(--white);
`;

const StyledMixedLink = styled(MixedLink)`
  color: var(--turquoise80);
  text-decoration: none;
`;

SlideBlock.propTypes = {
  button: PropTypes.object,
  dynamicComponent: PropTypes.string,
  gridType: PropTypes.string,
  header: PropTypes.string,
  items: PropTypes.array,
  isWide: PropTypes.bool,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listTypeId: PropTypes.string,
  mixedLink: mixedLinkShape,
  pageId: PropTypes.string,
  section: PropTypes.string,
  tileType: PropTypes.string,
  truncate: PropTypes.number,
  panelProps: PropTypes.shape({
    role: PropTypes.string,
    "aria-hidden": PropTypes.bool,
    "aria-labelledby": PropTypes.string,
    id: PropTypes.string,
  }),
};

export default SlideBlock;
