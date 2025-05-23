/* eslint-disable react/prop-types */
"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getSiteString, makeReleaseFeature } from "@/lib/utils";
import { makeDateString } from "@/helpers/dates";
import * as Styled from "./styles";
import { Image } from "@rubin-epo/epo-react-lib";
import { useRelease } from "@/lib/api/noirlabReleases";
import { fallbackLng } from "@/lib/i18n/settings";

const getDateString = (newsDate, eventStart, eventEnd, locale) => {
  if (newsDate) {
    return makeDateString(newsDate, { locale });
  }

  if (eventStart && eventEnd) {
    return `${makeDateString(eventStart, { locale })} - ${makeDateString(
      eventEnd,
      { locale }
    )}`;
  }

  if (eventEnd) {
    return makeDateString(eventEnd, { locale });
  }
};

export default function CalloutEntry({ callout }) {
  const {
    t,
    i18n: { language = fallbackLng },
  } = useTranslation();
  const { id, entry, backgroundColor } = callout;
  // mix in the noirlabReleases from additional fetch to different endpoint
  const { data: entryWithRelease } = useRelease(
    getSiteString(language),
    entry[0]
  );

  if (!entry[0] && !entryWithRelease) return null;

  const {
    title,
    date,
    release_date: releaseDate,
    startDate,
    endDate,
    url,
    description,
    subtitle,
    hero,
    image,
    images: releaseImages,
    entryType,
  } = entryWithRelease || entry[0];
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(
    date || releaseDate,
    startDate,
    endDate,
    language
  );
  const calloutImage =
    image?.[0] ||
    makeReleaseFeature(releaseImages, "screen640")?.[0] ||
    hero?.[0];

  return (
    <Styled.Section
      style={{ "--color-background-section": `var(--${backgroundColor})` }}
      data-dark-mode={
        backgroundColor.includes("invert") || backgroundColor.includes("black")
      }
      $width="full"
      $overlay={false}
    >
      <Styled.Inner $isImage={!!calloutImage}>
        {calloutImage && (
          <Styled.ImageWrapper>
            <Image role="presentation" image={calloutImage} />
            <Styled.ImageSticker>{type}</Styled.ImageSticker>
          </Styled.ImageWrapper>
        )}
        <Styled.Heading id={titleId}>{title}</Styled.Heading>
        {calloutDateString && (
          <Styled.Subheading className="t-heading-quaternary">
            {calloutDateString}
          </Styled.Subheading>
        )}
        {(description || subtitle) && (
          <Styled.Text
            className="c-content-rte"
            dangerouslySetInnerHTML={{ __html: description || subtitle }}
          />
        )}
        <Styled.Footer>
          <Styled.FooterButton
            href={url}
            aria-labelledby={titleId}
            className={`c-buttonish c-buttonish--inert`}
          >
            {t("read-more")}
          </Styled.FooterButton>
        </Styled.Footer>
      </Styled.Inner>
      {typeSlug === "news-post" && (
        <Styled.SharePopup title={title} url={url} />
      )}
    </Styled.Section>
  );
}

CalloutEntry.propTypes = {
  callout: PropTypes.shape({
    entry: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
  }).isRequired,
};
