import PropTypes from "prop-types";
import getRootPages from "@/services/craft/globals/rootPages";
import { getLocale } from "@/lib/i18n/server";
import { createLocationString } from "@/lib/helpers/location";
import { checkIfBetweenDates } from "@/lib/utils/dates";
import { getCustomBreadcrumbs } from "@/lib/helpers/breadcrumbs";
import { useTranslation } from "@/lib/i18n";
import Hero from "@/components/molecules/Hero";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/page/Breadcrumbs";
import { Container } from "@rubin-epo/epo-react-lib";
import EventList from "@/dynamic/EventList";
import EventTime from "@/components/EventTime";
import * as Styled from "./styles";

export default async function EventPage({
  data: {
    address,
    city,
    contentBlocks,
    country,
    timezone,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    eventType = [],
    hero = [],
    focalPointX,
    focalPointY,
    id,
    registrationCloseDate,
    registrationOpenDate,
    state,
    title,
    uri,
  },
}) {
  const { t } = await useTranslation(getLocale());
  const rootPages = await getRootPages();
  const customBreadcrumbs = getCustomBreadcrumbs({
    rootPages,
    header: "Events",
  });
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];

  const pageLink = {
    id,
    uri,
    title,
  };
  // logic for displaying city/state in US, city/country outside
  const location = `${address ? address + "," : ""} ${createLocationString(
    city,
    state,
    country
  )}`;
  // check registration
  const isThereRegistration = !!registrationCloseDate;
  const registration = checkIfBetweenDates(
    registrationOpenDate,
    registrationCloseDate
  )
    ? "open"
    : "closed";

  return (
    <>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Hero data={hero} {...{ focalPointX, focalPointY }} />
      <Container paddingSize="medium">
        <div>
          {eventType?.[0]?.title && (
            <Styled.Pretitle className="t-heading-quaternary">
              {eventType?.[0]?.title}
            </Styled.Pretitle>
          )}
          <h1>{title}</h1>
          <Styled.Subtitle>
            <div>{location}</div>
            <EventTime
              {...{
                startDate,
                startTime,
                endDate,
                endTime,
                timezone,
              }}
            />
            {isThereRegistration && <div>{t(`events.${registration}`)}</div>}
          </Styled.Subtitle>
        </div>
      </Container>
      <Share />
      {description && (
        <Container paddingSize="medium">
          <div
            className="c-content-rte"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Container>
      )}

      {contentBlocks.length > 0 &&
        [...contentBlocks].map((block) => {
          if (!block.id || !block.typeHandle) return null;
          return (
            <ContentBlockFactory
              key={block.id}
              type={block.typeHandle}
              data={block}
              pageId={id}
            />
          );
        })}
      <EventList
        section="eventsAll"
        excludeId={id}
        header={t(`events.related-events`)}
        limit={3}
        button={{
          text: t(`events.go-to-events`),
          uri: `${rootHomeLink?.uri}`,
        }}
        isWide
        isRelatedList
      />
    </>
  );
}

EventPage.displayName = "Template.EventPage";

EventPage.propTypes = {
  data: PropTypes.object,
};
