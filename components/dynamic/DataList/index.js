import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container } from "@rubin-epo/epo-react-lib";
import {
  usePathData,
  normalizePathData,
  useList,
  useGlobalData,
} from "@/lib/utils";

const DataList = ({
  children,
  component,
  excludeId = null,
  isSitewideSearch,
  limit = 10,
  showsFeatured = false,
  section = null,
  isRelatedList = false,
}) => {
  const { t } = useTranslation();
  const { asPath, query } = usePathData();
  const { pathname, pathParams } = normalizePathData(asPath);
  const router = useRouter();

  // for the event list, we want to have past events show differently based on querystring type=past
  if (section === "events" && query?.type === "past") {
    section = "eventsPast";
  }

  // refine listTypeId according to dynamic dropdown selection
  const categories = useGlobalData("categories");
  const listTypeMap = {
    newsPosts: "news-post",
    pressReleases: "press-release",
    imageGalleryItems: "image",
    videoGalleryItems: "video",
  };
  const listType = categories.find((c) => c.slug === listTypeMap[component]);
  const listTypeId = listType?.id;

  const { data, isLoading, isError } = useList({
    excludeId,
    isSitewideSearch,
    limit,
    showsFeatured,
    listTypeId,
    section,
  });

  if (isLoading || isError) return null;

  const { offset, total } = data;
  const numberOfPages = Math.ceil(total / limit) || 1;

  // if our page is out of bounds, we must instead go to the last page with data
  if (offset > total) {
    router.push({
      pathname,
      query: { ...pathParams, page: numberOfPages },
    });
  }

  if (total === 0 && isRelatedList) return null;

  if (total === 0)
    return (
      <Container>
        <div>{t(`search-no-results`)}</div>
      </Container>
    );

  return children(data);
};

DataList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  component: PropTypes.node,
  excludeId: PropTypes.string,
  isSitewideSearch: PropTypes.bool,
  showsFeatured: PropTypes.bool,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  section: PropTypes.string,
  isRelatedList: PropTypes.bool,
};

export default DataList;
