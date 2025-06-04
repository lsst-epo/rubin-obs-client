import { FC } from "react";
import { Event } from "schema-dts";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import getRootPages from "@/services/craft/globals/rootPages";
import { striptags } from "@/lib/utils/strings";
import { checkIfBetweenDates, formatStructuredDate } from "@/lib/utils/dates";
import { getCustomBreadcrumbs } from "@/lib/helpers/breadcrumbs";
import { isDefaultLocale, useTranslation } from "@/lib/i18n";
import Hero from "@/components/molecules/Hero";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import EventList from "@/dynamic/EventList";
import EventTime from "@/components/EventTime";
import RichTextContent from "@/components/atomic/RichTextContent";
import Address from "@/components/atomic/Address";
import StructuredData from "@/components/atomic/StructuredData";
import { getPathname } from "@/lib/i18n/navigation";
import { env } from "@/env";

const EventPage: FC<{ data: any }> = async ({
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
}) => {
  const {
    t,
    i18n: { language },
  } = await useTranslation();
  const rootPages = await getRootPages();
  const customBreadcrumbs =
    getCustomBreadcrumbs({
      rootPages,
      header: "Events",
    }) || [];
  const rootHomeLink = customBreadcrumbs?.slice(-1)[0];

  const pageLink: InternalLink = {
    id,
    uri,
    title,
  };

  // check registration
  const isThereRegistration = !!registrationCloseDate;
  const registration = checkIfBetweenDates(
    registrationOpenDate,
    registrationCloseDate
  )
    ? "open"
    : "closed";

  const hasAddress = !!address || !!city || !!state || !!country;

  const event: Event = {
    "@type": "Event",
    name: title,
    startDate: formatStructuredDate({
      date: new Date(startDate),
      time: startTime ? new Date(startTime) : undefined,
      timezone,
    }),
    endDate: formatStructuredDate({
      date: new Date(endDate),
      time: endTime ? new Date(endTime) : undefined,
      timezone,
    }),
    location: hasAddress
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: address,
            addressLocality: city,
            addressRegion: state,
            addressCountry: {
              "@type": "Country",
              name: country,
            },
          },
        }
      : undefined,
    description:
      description ||
      contentBlocks
        .map((block) => {
          if (block.typeHandle === "text") {
            return striptags(block.text);
          } else {
            return "";
          }
        })
        .join(" "),
    url: new URL(
      getPathname({
        href: uri,
        locale: language,
        forcePrefix: !isDefaultLocale(language),
      }),
      env.NEXT_PUBLIC_BASE_URL
    ).toString(),
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[...(customBreadcrumbs as Array<InternalLink>), pageLink]}
        locale={language}
      />
      <Hero data={hero} {...{ focalPointX, focalPointY }} />
      <Container paddingSize="medium">
        <StructuredData jsonLd={event} />
        <Stack space="var(--size-spacing-2xs">
          {eventType?.[0]?.title && (
            <div className="t-heading-quaternary">{eventType?.[0]?.title}</div>
          )}
          <h1>{title}</h1>
          <div>
            <Address line1={address} {...{ city, state, country }} />
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
          </div>
        </Stack>
      </Container>
      <Share locale={language} />
      {description && (
        <Container paddingSize="medium">
          <RichTextContent text={description} />
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
};

EventPage.displayName = "Template.EventPage";

export default EventPage;
