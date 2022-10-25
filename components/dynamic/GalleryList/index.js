import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import Pagination from "@/page/Pagination";
import { useCantoAssets } from "@/hooks";
import MasonryGrid from "./MasonryGrid";

const LIMIT = 10;

// align Canto API search params with those coming from generic FilterBar component
function mapParamKey(key) {
  switch (key) {
    case "filter":
      return "scheme";
    case "sort":
      return "sortDirection";
    case "search":
      return "keyword";
    default:
      return key;
  }
}

const mapParamsToAPI = (params) => {
  return Object.keys(params).reduce((accumulator, value) => {
    return { ...accumulator, [mapParamKey(value)]: params[value] };
  }, {});
};

const GalleryList = ({ albumId = "HDSNU", fallbackData }) => {
  const router = useRouter();
  const {
    query: { page, ...restParams },
  } = router;
  const restFetchParams = mapParamsToAPI(restParams);
  const {
    data: { results = [], start, total },
    isLoading,
    isError,
  } = useCantoAssets({
    albumId,
    fetchParams: { limit: LIMIT, ...restFetchParams },
    fallbackData: page === 1 ? fallbackData : null, // don't show server-fetched results as fallback if page > 1
  });
  const { t } = useTranslation();

  if (isError)
    return (
      <Container width="regular">
        <p>{t("gallery.error")}</p>
      </Container>
    );

  return (
    <div className="l-pad-top-large">
      {<MasonryGrid items={results} limit={LIMIT} isLoading={isLoading} />}
      {total > LIMIT && (
        <Pagination
          limit={LIMIT}
          offset={start}
          page={page || 1}
          total={total}
        />
      )}
    </div>
  );
};

GalleryList.propTypes = {
  albumId: PropTypes.string,
  fallbackData: PropTypes.object,
};

export default GalleryList;
