import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import SlideshowTile from "./SlideshowTile";

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
              {entries.map((entry) => {
                const { id, description, image, title, uri } = entry;

                return (
                  <SlideshowTile
                    gridType={gridType}
                    key={id}
                    slideshow={entry}
                    {...{ id, description, image, title, uri }}
                  />
                );
              })}
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
