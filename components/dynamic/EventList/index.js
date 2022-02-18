import PropTypes from "prop-types";
import styled from "styled-components";
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
import { fluidScale, respond } from "@/styles/globalStyles";
import Buttonish from "@/components/atomic/Buttonish";

const EventList = ({
  button,
  excludeId = null,
  header,
  limit = 8,
  isWide = false,
  gridType = "events",
}) => {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || "en-US";

  return (
    <DataList excludeId={excludeId} limit={limit} section="events">
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid columns={1}>
                  {entries.map(
                    ({
                      address,
                      city,
                      country,
                      date,
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

                      return (
                        /* eslint-disable */
                        <Tile
                          className={isThereRegistration ? registration : null}
                          key={id}
                          footer={
                            isThereRegistration
                              ? {
                                  sticker: (
                                    <Sticker>
                                      <IconComposer icon={lock} size={18} />
                                      <span>{t(`events.${registration}`)}</span>
                                    </Sticker>
                                  ),
                                }
                              : null
                          }
                          image={image?.[0]}
                          link={uri}
                          pretitle={
                            gridType === "events" && eventType?.[0]?.title
                              ? eventType?.[0]?.title
                              : eventType?.[0]?.slug
                              ? t(`events.${eventType?.[0]?.slug}`)
                              : " "
                          }
                          subtitle={
                            <Date>
                              <span className="month">{month}</span>
                              <span className="day">{day}</span>
                              <span className="year">{year}</span>
                            </Date>
                          }
                          text={description}
                          title={`${title}${loc && " - " + loc}`}
                          type={gridType}
                        />
                      );
                    }
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

const Header = styled.h2`
  margin-bottom: ${fluidScale("40px", "20px")};
  padding-bottom: 10px;
  border-bottom: 10px solid var(--turquoise55);
`;

const Footer = styled.div`
  padding-top: 40px;
`;

const Date = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;

  > * + * {
    margin-top: 5px;
  }

  .month {
    font-size: ${fluidScale("22px", "18px")};
    font-weight: 800;
    ${respond(`font-weight: 400;`)}
  }

  .day {
    font-size: ${fluidScale("40px", "20px")};
    font-weight: 800;
  }

  .year {
    font-size: 20px;
    font-weight: 400;
  }
`;

const Sticker = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;

  > * + * {
    margin-left: 10px;
  }
`;

EventList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

EventList.displayName = "Dynamic.EventList";

export default EventList;
