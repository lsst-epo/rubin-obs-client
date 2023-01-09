import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";
import {
  checkIfBetweenDates,
  createLocationString,
  makeDateObject,
  useGlobalData,
} from "@/lib/utils";
import IconComposer from "@/svg/IconComposer";
import Buttonish from "@/components/atomic/Buttonish";
import * as Styled from "./styles";

const EventList = ({
  button,
  excludeId = null,
  header,
  limit = 8,
  isWide = false,
  gridType = "events",
  isRelatedList = false,
}) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || "en-US";

  return (
    <DataList
      isRelatedList={isRelatedList}
      excludeId={excludeId}
      limit={limit}
      section="events"
    >
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Styled.Header>{header}</Styled.Header>}
              {entries?.length > 0 && (
                <Grid columns={1}>
                  {entries.map(
                    ({
                      address,
                      city,
                      country,
                      date,
                      endDate,
                      description,
                      id,
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

                      const { year, month, day } = makeDateObject(
                        date,
                        lang,
                        true
                      );

                      const endDateObject = endDate
                        ? makeDateObject(endDate, lang, true)
                        : null;

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
                          image={image?.[0]}
                          link={uri}
                          pretitle={
                            gridType === "events" && eventType?.[0]?.title
                              ? eventType?.[0]?.title
                              : " "
                          }
                          subtitle={
                            <Styled.DateWrapper $hasEndDate={!!endDateObject}>
                              <Styled.Date>
                                <Styled.DateMonth>{month}</Styled.DateMonth>
                                <Styled.DateDay>{day}</Styled.DateDay>
                                <Styled.DateYear>{year}</Styled.DateYear>
                              </Styled.Date>
                              {endDateObject && (
                                <>
                                  <Styled.DateEmDash>—</Styled.DateEmDash>
                                  <Styled.Date>
                                    <Styled.DateMonth>
                                      {endDateObject.month}
                                    </Styled.DateMonth>
                                    <Styled.DateDay>
                                      {endDateObject.day}
                                    </Styled.DateDay>
                                    <Styled.DateYear>
                                      {endDateObject.year}
                                    </Styled.DateYear>
                                  </Styled.Date>
                                </>
                              )}
                            </Styled.DateWrapper>
                          }
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
              {button && (
                <Styled.Footer>
                  <Buttonish
                    isBlock={true}
                    text={button.text}
                    url={`/${button.uri}`}
                  />
                </Styled.Footer>
              )}
            </div>
          </Container>
          {limit >= 8 && (
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

EventList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
  isRelatedList: PropTypes.bool,
};

EventList.displayName = "Dynamic.EventList";

export default EventList;
