import PropTypes from "prop-types";
import Pagination from "@/page/Pagination";
import DataList from "@/dynamic/DataList";
import MasonryGrid from "@/components/layout/MasonryGrid";

const GalleryList = ({ excludeId = null, limit = 20 }) => {
  return (
    <div className="l-pad-top-large">
      <DataList excludeId={excludeId} limit={limit} section="galleryItems">
        {({ entries, offset, page, total }) => (
          <>
            {entries?.length > 0 && <MasonryGrid items={entries}></MasonryGrid>}
            {limit >= 20 && (
              <Pagination
                limit={limit}
                offset={offset}
                page={page}
                total={total}
              />
            )}
          </>
        )}
      </DataList>
    </div>
  );
};

GalleryList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
};

export default GalleryList;
