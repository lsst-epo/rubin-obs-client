"use client";
import React from "react";
import PropTypes from "prop-types";
import striptags from "striptags";
import chunk from "lodash/chunk";
import Tile from "@/atomic/Tile";
import Loader from "@/atomic/Loader";
import { Grid } from "@rubin-epo/epo-react-lib";
import { useReleases } from "@/lib/api/noirlabReleases";
import { normalizeItemData, makeReleaseFeature, useList } from "@/lib/utils";
import * as Styled from "./styles";

function CarouselGrid({ items = [], limit, listTypeId, pageId }) {
  const section = "pages";
  const tileType = "pages";
  // get manually-curated data first
  const curatedItems = normalizeItemData(items);
  const { entries } = useReleases("default", curatedItems);

  const { data, isLoading } = useList({
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
  const allItems = [...entries, ...filteredEntries];
  const chunkedItems = chunk(allItems, 3);

  function renderTiles(renderedItems) {
    return renderedItems.map(
      ({
        id,
        title,
        description,
        plainText,
        image,
        hero,
        images: releaseImages,
        mixedLink,
        externalUrl,
        uri,
        landingPage,
      }) => {
        return (
          <Tile
            key={id}
            image={
              image?.[0] ||
              makeReleaseFeature(releaseImages, "screen640")?.[0] ||
              hero?.[0]
            }
            link={
              mixedLink || {
                url: externalUrl || uri || landingPage?.[0]?.uri,
              }
            }
            text={plainText || striptags(description)}
            title={title}
            type={tileType}
          />
        );
      }
    );
  }

  if (isLoading) return <Loader speed="fast" isVisible />;
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
