import PropTypes from "prop-types";
import striptags from "striptags";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  makeBreadcrumbs,
  makeCustomBreadcrumbs,
  makeDateString,
  makeTruncatedString,
  useGlobalData,
} from "@/lib/utils";
import { fluidScale } from "@/styles/globalStyles";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { Buttonish } from "@/components/atomic";
import { Container, Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";

const SearchList = ({
  button,
  excludeId = null,
  header,
  limit = 10,
  isWide = true,
}) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const rootPages = useGlobalData("rootPages");
  const lang = localeInfo?.language || "en-US";
  const makePretitle = (entry) => {
    if (entry.eventType) {
      return entry.eventType[0].title;
    }
    if (entry.postType) {
      return entry.postType[0].title;
    }
    if (entry.jobPosition) {
      return t(`jobs.jobs`) + " - " + `${entry.jobPosition[0].title}`;
    }

    const pageLink = {
      id: entry.id,
      uri: entry.uri,
      title: entry.title,
    };
    let customBreadcrumbs;

    if (entry.typeHandle === "galleryItem") {
      customBreadcrumbs = makeCustomBreadcrumbs(rootPages, "Gallery");
      // add category strings and pre-filtered crumb: id, title, uri
      let typeId = "";
      let typeTitlePlural = "";
      let typeSlug = "gallery";

      if (entry.galleryItemCategory.length > 0) {
        typeId = entry.galleryItemCategory[0].id;
        typeTitlePlural = t(
          `gallery.plural-${entry.galleryItemCategory[0].slug}`
        );
        typeSlug = entry.galleryItemCategory[0].slug;

        customBreadcrumbs.push({
          id: typeId,
          title: typeTitlePlural,
          uri: `gallery/gallery-search?filter=${typeId}`,
        });
      }
      return (
        <Breadcrumbs
          breadcrumbs={[...customBreadcrumbs, pageLink]}
          type="search"
        />
      );
    }
    if (entry.typeHandle === "slideshow") {
      customBreadcrumbs = makeCustomBreadcrumbs(rootPages, "Slideshows");
      return (
        <Breadcrumbs
          breadcrumbs={[...customBreadcrumbs, pageLink]}
          type="search"
        />
      );
    }

    // finally, pages :)
    const crumbsArray = makeBreadcrumbs(entry.uri);
    return <Breadcrumbs breadcrumbs={crumbsArray} type="search" />;
  };

  return (
    <DataList excludeId={excludeId} limit={limit} isSitewideSearch={true}>
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid columns={1}>
                  {entries.map((entry) => {
                    return entry.id ? (
                      <Tile
                        key={entry.id}
                        image={entry.image?.[0]}
                        link={entry.uri}
                        pretitle={makePretitle(entry)}
                        subtitle={
                          entry.date &&
                          `${t("published")} ${makeDateString(
                            entry.date,
                            lang
                          )}`
                        }
                        text={
                          entry.jobPosition
                            ? t(`jobs.read-more`)
                            : makeTruncatedString(striptags(entry.description))
                        }
                        title={entry.title}
                        titleTag={"h2"}
                        type="search"
                      />
                    ) : null;
                  })}
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
          {limit >= 10 && (
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

SearchList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
};

export default SearchList;
