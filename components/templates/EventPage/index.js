"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  checkIfBetweenDates,
  createLocationString,
  useCustomBreadcrumbs,
} from "@/lib/utils";
import Hero from "@/components/molecules/Hero";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/page/Breadcrumbs";
import { Container } from "@rubin-epo/epo-react-lib";
import EventList from "@/dynamic/EventList";
import EventTime from "@/components/EventTime";
import * as Styled from "./styles";

export default function EventPage({
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
  const { t } = useTranslation();
  const customBreadcrumbs = useCustomBreadcrumbs("Events");
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
