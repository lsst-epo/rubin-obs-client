import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container, Buttonish } from "@rubin-epo/epo-react-lib";
import Loader from "@/atomic/Loader";
import Pagination from "@/components/molecules/Pagination";
import { useList, useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";
import useQueryParams from "@/lib/routing/useQueryParams";

const DataList = ({
  children,
  component,
  excludeId = null,
  isSitewideSearch,
  limit = 10,
  showsFeatured = false,
  section = null,
  isRelatedList = false,
  width = "regular",
  header,
  footerButton,
  loaderDescription,
}) => {
  const { t } = useTranslation();
  const { queryParams, setQueryParams } = useQueryParams();

  // for the event list, we want to have past events show differently based on querystring type=past
  if (section === "events" && queryParams.get("type") === "past") {
    section = "eventsPast";
  }

  // refine listTypeId according to dynamic dropdown selection
  const categories = useGlobalData("categories");
  const listTypeMap = {
    newsPosts: "news-post",
    pressReleases: "press-release",
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

  function renderData() {
    const { offset, total } = data;
    const numberOfPages = Math.ceil(total / limit) || 1;

    // if our page is out of bounds, we must instead go to the last page with data
    if (offset > total) {
      setQueryParams({ page: numberOfPages });
    }

    if (total === 0 && isRelatedList) return null;
    if (total === 0) return <div>{t(`search-no-results`)}</div>;
    return children(data);
  }

  function renderPagination() {
    const { offset, page, total } = data;

    if (limit >= total || section === "glossaryTerms" || isRelatedList)
      return null;
    return (
      <Pagination limit={limit} offset={offset} page={page} total={total} />
    );
  }

  if (isError) return null;
  return (
    <>
      <Container width={width}>
        {header && <Styled.Header>{header}</Styled.Header>}
        {isLoading && (
          <Loader
            speed="fast"
            isVisible
            description={loaderDescription || t("loading")}
          />
        )}
        {!isLoading && data && renderData()}
        {footerButton && (
          <Styled.Footer>
            <Buttonish
              isBlock={true}
              text={footerButton.text}
              url={`/${footerButton.uri}`}
            />
          </Styled.Footer>
        )}
      </Container>
      <Container width={width}>
        {!isLoading && data && renderPagination()}
      </Container>
    </>
  );
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
  width: PropTypes.string,
  header: PropTypes.string,
  footerButton: PropTypes.object,
  loaderDescription: PropTypes.string,
};

export default DataList;
