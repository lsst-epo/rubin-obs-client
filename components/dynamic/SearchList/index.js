import PropTypes from "prop-types";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import {
  makeBreadcrumbs,
  makeCustomBreadcrumbs,
  useGlobalData,
} from "@/lib/utils";
import { makeTruncatedString } from "@/lib/utils/strings";
import { cantoToImageShape } from "@/lib/api/canto";
import { makeDateString } from "@/helpers/dates";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import * as Styled from "./styles";

const SearchList = ({
  button,
  excludeId = null,
  header,
  limit = 10,
  isWide = true,
}) => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const rootPages = useGlobalData("rootPages");

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
          locale={locale}
        />
      );
    }

    // finally, pages :)
    const crumbsArray = makeBreadcrumbs(entry.uri);
    return (
      <Breadcrumbs breadcrumbs={crumbsArray} type="search" locale={locale} />
    );
  };

  const makeSubtitle = (entry) => {
    const type = {
      gallery: t("gallery.gallery"),
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
            ? `${t("published")} ${makeDateString(entry.date, { locale })}`
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
                const { cantoAssetSingle } = entry;

                return entry.id ? (
                  <Tile
                    key={entry.id}
                    image={
                      cantoAssetSingle?.length > 0
                        ? cantoToImageShape(cantoAssetSingle[0], 240, locale)
                        : entry.image?.[0]
                    }
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
