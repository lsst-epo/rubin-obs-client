import React from "react";
import PropTypes from "prop-types";
import striptags from "striptags";
import chunk from "lodash/chunk";
import Tile from "@/atomic/Tile";
import { Grid } from "@rubin-epo/epo-react-lib";
import { normalizeItemData, useList } from "@/lib/utils";
import * as Styled from "./styles";

function CarouselGrid({
  items = [],
  limit,
  listTypeId,
  sectionHandle,
  pageId,
}) {
  const section = "pages";
  const tileType = "pages";
  // get manually-curated data first
  const curatedItems = normalizeItemData(items);

  const { data } = useList({
    limit,
    listTypeId,
    section,
    excludeId: pageId,
  }) || {
    data: {},
  };
  const curatedIds = curatedItems.map((item) => item.id);
  // filter out curatedItems
  const filteredEntries = !data?.entries?.length
    ? []
    : data.entries.filter((item) => curatedIds.indexOf(item.id) < 0);
  const allItems = [...curatedItems, ...filteredEntries];
  const chunkedItems = chunk(allItems, 3);

  function renderTiles(renderedItems) {
    return renderedItems.map(
      ({
        id,
        title,
        description,
        plainText,
        image,
        mixedLink,
        externalUrl,
        uri,
        landingPage,
      }) => (
        <Tile
          key={id}
          image={image?.[0]}
          link={
            mixedLink || {
              url: externalUrl || uri || landingPage?.[0]?.uri,
            }
          }
          text={plainText || striptags(description)}
          title={title}
          type={tileType}
        />
      )
    );
  }

  if (!allItems?.length) return null;

  if (allItems.length <= 3)
    return (
      <Grid columns={3} tabletNumber={1}>
        {renderTiles(allItems)}
      </Grid>
    );

  return (
    <Styled.Carousel carouselOptions={{ adaptiveHeight: true }}>
      {chunkedItems.map((c, i) => (
        <Grid key={i} columns={3} tabletNumber={1}>
          {renderTiles(c)}
        </Grid>
      ))}
    </Styled.Carousel>
  );
}

CarouselGrid.propTypes = {
  sectionHandle: PropTypes.string,
  items: PropTypes.array,
  limit: PropTypes.number,
  listTypeId: PropTypes.string,
  pageId: PropTypes.string,
};

export default CarouselGrid;
