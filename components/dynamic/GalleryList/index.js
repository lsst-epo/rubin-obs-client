import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import DataList from "@/dynamic/DataList";
import { MasonryGrid } from "@rubin-epo/epo-react-lib";

const GalleryList = ({ excludeId = null, limit = 20, component }) => {
  const { t } = useTranslation();

  return (
    <div className="l-pad-top-large">
      <DataList
        excludeId={excludeId}
        limit={limit}
        section="galleryItems"
        component={component}
        width="regular"
        loaderDescription={t("gallery.loading")}
      >
        {({ entries }) => (
          <>
            {entries?.length > 0 && <MasonryGrid items={entries}></MasonryGrid>}
          </>
        )}
      </DataList>
    </div>
  );
};

GalleryList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  component: PropTypes.node,
};

export default GalleryList;
