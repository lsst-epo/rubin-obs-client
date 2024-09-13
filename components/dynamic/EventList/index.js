import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid, IconComposer } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import EventTime from "@/components/EventTime";
import { checkIfBetweenDates, createLocationString } from "@/lib/utils";
import * as Styled from "./styles";

const EventList = ({
  section = "events",
  button,
  excludeId = null,
  header,
  limit = 8,
  isWide = false,
  gridType = "events",
  isRelatedList = false,
}) => {
  const { t } = useTranslation();

  return (
    <DataList
      isRelatedList={isRelatedList}
      excludeId={excludeId}
      limit={limit}
      section={section}
      width={isWide ? "regular" : "narrow"}
      header={header}
      footerButton={button}
      loaderDescription={t("events.loading")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={1}>
              {entries.map(
                ({
                  address,
                  city,
                  country,
                  startDate,
                  endDate,
                  description,
                  id,
                  hero,
                  image,
                  eventType,
                  registrationCloseDate,
                  registrationOpenDate,
                  title,
                  state,
                  uri,
                }) => {
                  // logic for displaying city/state in US, city/country outside
                  const loc = createLocationString(city, state, country);

                  // check registration
                  const isThereRegistration = !!registrationCloseDate;
                  const registration = checkIfBetweenDates(
                    registrationOpenDate,
                    registrationCloseDate
                  )
                    ? "open"
                    : "closed";

                  const lock =
                    registration === "open" ? "LockOpen" : "LockClosed";
                  return (
                    /* eslint-disable */
                    <Tile
                      className={isThereRegistration ? registration : null}
                      key={id}
                      footer={
                        isThereRegistration
                          ? {
                              sticker: (
                                <Styled.Sticker>
                                  <IconComposer icon={lock} size={18} />
                                  <span>{t(`events.${registration}`)}</span>
                                </Styled.Sticker>
                              ),
                            }
                          : null
                      }
                      image={image?.[0] || hero?.[0]}
                      link={uri}
                      pretitle={
                        gridType === "events" && eventType?.[0]?.title
                          ? eventType?.[0]?.title
                          : " "
                      }
                      subtitle={<EventTime {...{ startDate, endDate }} short />}
                      text={description}
                      title={`${title}${loc && " — " + loc}`}
                      titleTag={"h2"}
                      type={gridType}
                    />
                  );
                }
              )}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

EventList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
  isRelatedList: PropTypes.bool,
  section: PropTypes.string,
};

EventList.displayName = "Dynamic.EventList";

export default EventList;
