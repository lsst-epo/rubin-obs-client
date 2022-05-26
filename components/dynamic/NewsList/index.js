import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";
import {
  makeDateString,
  makeTruncatedString,
  useGlobalData,
} from "@/lib/utils";
import { fluidScale } from "@/styles/globalStyles";
import Buttonish from "@/components/atomic/Buttonish";
import IconComposer from "@/svg/IconComposer";
import { SharePopup } from "@/components/atomic";

const NewsList = ({
  button,
  component,
  excludeId = null,
  header,
  limit: initialLimit = 10,
  isWide = false,
  gridType = "news",
}) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || "en-US";
  const cols = initialLimit === 4 ? 4 : initialLimit === 3 ? 3 : 2;
  const canShowFeatured = initialLimit > 4;

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
        <SharePopup title={title} url={url} />
      </>
    );
  };

  return (
    <DataList
      component={component}
      excludeId={excludeId}
      limit={initialLimit}
      showsFeatured={canShowFeatured}
      section="news"
    >
      {({ entries, limit, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid
                  showFeature={canShowFeatured && page === 1}
                  columns={cols}
                >
                  {entries.map(
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
                        footer={
                          gridType === "news"
                            ? {
                                button: t("read-more"),
                                sticker: makeSticker(newsAssets, title, url),
                              }
                            : null
                        }
                        image={image?.[0]}
                        isFeature={canShowFeatured && page === 1 && i === 0}
                        link={uri}
                        pretitle={
                          gridType === "news" && postType?.[0]?.title
                            ? postType[0].title
                            : null
                        }
                        subtitle={makeDateString(date, lang)}
                        text={makeTruncatedString(description, 30)}
                        title={title}
                        titleTag={"h2"}
                        type={gridType}
                      />
                    )
                  )}
                </Grid>
              )}
              {button && (
                <Footer>
                  <Buttonish
                    isBlock={true}
                    text={button.text}
                    url={`/${button.uri}`}
                  />
                </Footer>
              )}
            </div>
          </Container>
          {initialLimit >= 10 && (
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
  );
};

const Header = styled.h2`
  margin-bottom: ${fluidScale("40px", "20px")};
  padding-bottom: 10px;
  border-bottom: 10px solid var(--turquoise85);
`;

const Footer = styled.div`
  padding-top: 40px;
`;

NewsList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default NewsList;
