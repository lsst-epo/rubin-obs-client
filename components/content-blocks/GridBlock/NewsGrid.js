import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  makeDateString,
  normalizeItemData,
  useGlobalData,
  useList,
} from "@/lib/utils";
import { Grid } from "@rubin-epo/epo-react-lib";
import Tile from "@/atomic/Tile";

const NewsGrid = ({ items = [], limit, listTypeId, sectionHandle, pageId }) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || "en-US";
  // get manually-curated data first
  let allItems = normalizeItemData(items);

  const { data } = useList({
    limit,
    listTypeId,
    section: "news",
    excludeId: pageId,
  }) || {
    data: {},
  };
  if (data?.entries) {
    // combine with curated items
    allItems = [...allItems, ...data.entries].slice(0, limit);
  }

  return (
    <>
      {allItems?.length > 0 && (
        <Grid columns={2} showFeature={true}>
          {allItems.map(
            (
              {
                date,
                description,
                id,
                image,
                newsAssets,
                postType,
                title,
                uri,
                url,
              },
              i
            ) => (
              <Tile
                key={id}
                footer={{
                  button: t("read-more"),
                }}
                image={image?.[0]}
                isFeature={i === 0}
                link={uri}
                pretitle={postType?.[0]?.title ? postType[0].title : " "}
                subtitle={makeDateString(date, lang)}
                text={description}
                title={title}
                type="news"
                showSharePopup
              />
            )
          )}
        </Grid>
      )}
    </>
  );
};

NewsGrid.propTypes = {
  sectionHandle: PropTypes.string,
  items: PropTypes.array,
  limit: PropTypes.number,
  listTypeId: PropTypes.string,
  pageId: PropTypes.string,
};

export default NewsGrid;
