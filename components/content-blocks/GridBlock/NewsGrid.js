import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  makeDateString,
  normalizeItemData,
  useGlobalData,
  useList,
} from "@/lib/utils";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import IconComposer from "@/svg/IconComposer";
import { PopupShare } from "@/components/atomic/Share";

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

  const makeSticker = (newsAssets, title, url) => {
    const doc = newsAssets.filter((n, i) => n.textLink);

    const handleClick = (e) => {
      e.preventDefault();
      window.location.href = e.currentTarget.dataset.url;
    };

    return (
      <>
        {doc.length > 0 && doc[0].textLink && (
          <button data-url={doc[0].textLink[0].url} onClick={handleClick}>
            <IconComposer icon="doc" size=".8em" />
          </button>
        )}
        <PopupShare title={title} url={url} />
      </>
    );
  };

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
                  sticker: makeSticker(newsAssets, title, url),
                }}
                image={image?.[0]}
                isFeature={i === 0}
                link={uri}
                pretitle={
                  postType?.[0]?.slug ? t(`news.${postType?.[0]?.slug}`) : null
                }
                subtitle={makeDateString(date, lang)}
                text={description}
                title={title}
                type="news"
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
