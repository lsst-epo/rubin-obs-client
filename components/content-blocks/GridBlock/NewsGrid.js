"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  makeReleaseFeature,
  normalizeItemData,
  useGlobalData,
  useList,
} from "@/lib/utils";

import { makeTruncatedString } from "@/lib/utils/strings";

import { makeDateString } from "@/helpers/dates";
import { Grid } from "@rubin-epo/epo-react-lib";
import Tile from "@/atomic/Tile";
import Loader from "@/atomic/Loader";
import { fallbackLng } from "@/lib/i18n/settings";

const NewsGrid = ({ items = [], limit, listTypeId, sectionHandle, pageId }) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo?.language || fallbackLng;
  // get manually-curated data first
  let allItems = normalizeItemData(items);

  const { data, isLoading } = useList({
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
      {isLoading && <Loader speed="fast" isVisible />}
      {!isLoading && allItems?.length > 0 && (
        <Grid columns={2} showFeature={true}>
          {allItems.map(
            (
              {
                date,
                release_date: releaseDate,
                description,
                subtitle,
                id,
                image,
                hero,
                images: releaseImages,
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
                image={
                  image?.[0] ||
                  makeReleaseFeature(releaseImages, "screen640")?.[0] ||
                  hero?.[0]
                }
                isFeature={i === 0}
                link={uri}
                pretitle={postType?.[0]?.title ? postType[0].title : " "}
                subtitle={makeDateString(date || releaseDate, { locale })}
                text={makeTruncatedString(subtitle || description, 30)}
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
