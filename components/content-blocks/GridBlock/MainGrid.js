import PropTypes from "prop-types";
import striptags from "striptags";
import { normalizeItemData, useList } from "@/lib/utils";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";

const MainGrid = ({ items = [], limit, listTypeId, sectionHandle, pageId }) => {
  // get manually-curated data first
  const curatedItems = normalizeItemData(items);

  const sectionMap = {
    eventGrid: "events",
    staffGrid: "staffProfiles",
  };
  const section = sectionMap[sectionHandle] || "pages";
  const tileType = sectionMap[sectionHandle] || "pages";
  const tabletNumber = sectionHandle === "staffGrid" ? 2 : 1;
  const { data } = useList({
    limit,
    listTypeId,
    section: section,
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

  return (
    <>
      {allItems?.length > 0 && (
        <Grid columns={limit === 4 ? 4 : 3} tablet={tabletNumber}>
          {allItems.map(
            (
              {
                id,
                title,
                description,
                plainText,
                image,
                mixedLink,
                externalUrl,
                uri,
              },
              i
            ) => (
              <Tile
                key={id}
                image={image?.[0]}
                link={mixedLink || { url: externalUrl || uri }}
                text={plainText || striptags(description)}
                title={title}
                type={tileType}
              />
            )
          )}
        </Grid>
      )}
    </>
  );
};

MainGrid.propTypes = {
  sectionHandle: PropTypes.string,
  items: PropTypes.array,
  limit: PropTypes.number,
  listTypeId: PropTypes.string,
  pageId: PropTypes.string,
};

export default MainGrid;
