import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  checkIfBetweenDates,
  createLocationString,
  useCustomBreadcrumbs,
  useDateString,
} from "@/lib/utils";
import Body from "@/global/Body";
import Hero from "@/page/Hero";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/page/Breadcrumbs";
import Container from "@/layout/Container";
import EventList from "@/dynamic/EventList";

export default function EventPage({
  data: {
    address,
    city,
    contentBlocks,
    country,
    date,
    endDate,
    description,
    eventType = [],
    featuredImage = [],
    hero = [],
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
  const bodyProps = {
    description,
    featuredImage,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };
  const localizedDate = useDateString(date);
  const localizedEndDate = useDateString(endDate);
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
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Hero data={hero} />
      <Container paddingSize="medium">
        <div>
          {eventType?.[0]?.title && (
            <Pretitle className="t-heading-quaternary">
              {eventType?.[0]?.title}
            </Pretitle>
          )}
          <h1>{title}</h1>
          <Subtitle>
            <div>{location}</div>
            <div>
              {localizedDate}
              {endDate ? ` — ${localizedEndDate}` : ""}
            </div>
            {isThereRegistration && <div>{t(`events.${registration}`)}</div>}
          </Subtitle>
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
        excludeId={id}
        header={t(`events.related-events`)}
        limit={3}
        button={{
          text: t(`events.go-to-events`),
          uri: `${rootHomeLink?.uri}`,
        }}
        isWide={true}
      />
    </Body>
  );
}

const Pretitle = styled.div`
  padding-bottom: 10px;
`;

const Subtitle = styled.div`
  padding-top: 10px;
`;
EventPage.displayName = "Template.EventPage";

EventPage.propTypes = {
  data: PropTypes.object,
};
