import PropTypes from "prop-types";
import striptags from "striptags";
import { normalizeItemData, useList } from "@/lib/utils";
import Grid from "@/layout/Grid";
import Tile from "@/primitives/Tile";

const MainGrid = ({ items = [], limit, listTypeId, sectionHandle, pageId }) => {
  // get manually-curated data first
  let allItems = normalizeItemData(items);

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
  if (data?.entries) {
    // combine with curated items. Filter so no dupes.
    allItems = [
      ...allItems,
      ...data.entries.filter((item) => allItems.indexOf(item) < 0),
    ].slice(0, limit);
  }
  const cols = limit === 4 ? 4 : 3;

  return (
    <>
      {allItems?.length > 0 && (
        <Grid columns={cols} tablet={tabletNumber}>
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
