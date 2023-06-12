import PropTypes from "prop-types";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";

const SlideshowList = ({
  button,
  excludeId = null,
  header,
  limit = 10,
  isWide = false,
  gridType = "slideshows",
}) => {
  const { t } = useTranslation();

  return (
    <DataList
      excludeId={excludeId}
      limit={limit}
      section="slideshows"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      loaderDescription={t("gallery.loading-slideshows")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={1}>
              {entries.map(({ id, description, image, title, uri }, i) => (
                <Tile
                  key={id}
                  footer={
                    gridType === "darkSlide" || gridType === "slideshows"
                      ? { button: t(`gallery.start-slideshow`) }
                      : null
                  }
                  image={image?.[0]}
                  isFeature={true}
                  link={uri}
                  pretitle={
                    gridType === "darkSlide" || gridType === "slideshows"
                      ? t(`gallery.slideshow`)
                      : null
                  }
                  text={striptags(description)}
                  title={title}
                  titleTag={"h2"}
                  type={gridType}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

SlideshowList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default SlideshowList;
