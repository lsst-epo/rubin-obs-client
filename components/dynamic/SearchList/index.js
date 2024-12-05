import PropTypes from "prop-types";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import {
  makeBreadcrumbs,
  makeCustomBreadcrumbs,
  makeDateString,
  makeTruncatedString,
  useGlobalData,
} from "@/lib/utils";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import * as Styled from "./styles";
import { fallbackLng } from "@/lib/i18n/settings";

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
  const lang = localeInfo?.language || fallbackLng;

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

  const makeSubtitle = (entry) => {
    const type = {
      slideshow: t("gallery.slideshow"),
      events: t("events.event"),
      job: t("jobs.job"),
      post: t("news.news"),
      pages: t("pages.page"),
      studentPages: t("pages.page"),
      educatorPages: t("pages.page"),
      staffProfiles: t("staff.rubin-voices"),
      glossaryTerm: t("glossary.glossary-term"),
      investigationLandingPage: t("investigation.investigation"),
    }[entry.typeHandle];

    return (
      <Styled.PretitleContainer>
        <div>{type ? `${type} ` : ``}</div>
        <div>
          {entry.date
            ? `${t("published")} ${makeDateString(entry.date, lang)}`
            : ``}
        </div>
      </Styled.PretitleContainer>
    );
  };

  return (
    <DataList
      excludeId={excludeId}
      limit={limit}
      isSitewideSearch={true}
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={1}>
              {entries.map((entry) => {
                return entry.id ? (
                  <Tile
                    key={entry.id}
                    image={entry.image?.[0]}
                    link={entry.uri}
                    pretitle={makePretitle(entry)}
                    subtitle={makeSubtitle(entry)}
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
        </>
      )}
    </DataList>
  );
};

SearchList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
};

export default SearchList;
