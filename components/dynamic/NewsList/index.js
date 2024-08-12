import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import {
  makeDateString,
  makeTruncatedString,
  makeReleaseFeature,
  useGlobalData,
} from "@/lib/utils";
import { fallbackLng } from "@/lib/i18n/settings";

const NewsList = ({
  button,
  component,
  excludeId = null,
  header,
  limit: initialLimit = 10,
  isWide = false,
  gridType = "news",
  isRelatedList = false,
}) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || fallbackLng;
  const cols = initialLimit === 4 ? 4 : initialLimit === 3 ? 3 : 2;
  const canShowFeatured = initialLimit > 4;

  return (
    <DataList
      component={component}
      excludeId={excludeId}
      limit={initialLimit}
      showsFeatured={canShowFeatured}
      section="news"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      isRelatedList={isRelatedList}
      loaderDescription={t("news.loading")}
    >
      {({ entries, page }) => (
        <>
          {entries?.length > 0 && (
            <Grid showFeature={canShowFeatured && page === 1} columns={cols}>
              {entries.map(
                (
                  {
                    date,
                    release_date: releaseDate,
                    description,
                    subtitle,
                    id,
                    hero,
                    image: featureImage,
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
                    footer={
                      gridType === "news"
                        ? {
                            button: t("read-more"),
                          }
                        : null
                    }
                    image={
                      featureImage?.[0] ||
                      makeReleaseFeature(releaseImages)?.[0] ||
                      hero?.[0]
                    }
                    isFeature={canShowFeatured && page === 1 && i === 0}
                    link={uri}
                    pretitle={
                      gridType === "news" && postType?.[0]?.title
                        ? postType[0].title
                        : null
                    }
                    subtitle={makeDateString(date || releaseDate, lang)}
                    text={makeTruncatedString(description || subtitle, 30)}
                    title={title}
                    titleTag={"h2"}
                    type={gridType}
                    showSharePopup
                  />
                )
              )}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

NewsList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
  isRelatedList: PropTypes.bool,
};

export default NewsList;
