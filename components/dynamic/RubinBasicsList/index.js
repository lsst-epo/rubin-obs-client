"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Grid from "@rubin-epo/epo-react-lib/Grid";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import { makeReleaseFeature, useGlobalData } from "@/lib/utils";
import { makeTruncatedString } from "@/lib/utils/strings";
import { fallbackLng } from "@/lib/i18n/settings";

const RubinBasicsList = ({
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
  const locale = localeInfo?.language || fallbackLng;
  const cols = initialLimit === 4 ? 4 : initialLimit === 3 ? 3 : 2;
  const canShowFeatured = initialLimit > 4;

  return (
    <DataList
      component={component}
      excludeId={excludeId}
      limit={initialLimit}
      showsFeatured={canShowFeatured}
      section="rubinBasics"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      isRelatedList={isRelatedList}
      loaderDescription={t("rubin-basics.loading")}
    >
      {({ entries, page }) => (
        <>
          {entries?.length > 0 && (
            <Grid showFeature={canShowFeatured && page === 1} columns={cols}>
              {entries.map(
                (
                  {
                    description,
                    subtitle,
                    id,
                    hero,
                    image,
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
                      gridType === "rubinBasics"
                        ? {
                            button: t("read-more"),
                          }
                        : null
                    }
                    image={
                      image?.[0] ||
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

RubinBasicsList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
  isRelatedList: PropTypes.bool,
};

export default RubinBasicsList;
