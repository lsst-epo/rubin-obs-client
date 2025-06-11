/* eslint-disable react/prop-types */
"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getSiteString, makeReleaseFeature } from "@/lib/utils";
import { makeDateString } from "@/helpers/dates";
import Image from "@rubin-epo/epo-react-lib/Image";
import { useRelease } from "@/lib/api/noirlabReleases";
import { fallbackLng } from "@/lib/i18n/settings";
import { Section } from "../styles";
import * as Styled from "./styles";
import styles from "./styles.module.css";

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

const CalloutEntry = ({ callout }) => {
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
    <Section
      className={styles.section}
      style={{ "--color-background-section": `var(--${backgroundColor})` }}
      data-dark-mode={
        backgroundColor.includes("invert") || backgroundColor.includes("black")
      }
      $width="full"
      $overlay={false}
    >
      <Styled.Inner data-has-image={!!calloutImage}>
        {calloutImage && (
          <Styled.ImageWrapper>
            <Image role="presentation" image={calloutImage} />
            <Styled.ImageSticker>{type}</Styled.ImageSticker>
          </Styled.ImageWrapper>
        )}
        <h2 className={styles.heading} id={titleId}>
          {title}
        </h2>
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
    </Section>
  );
};

CalloutEntry.displayName = "ContentBlock.Callout.Entry";

CalloutEntry.propTypes = {
  callout: PropTypes.shape({
    entry: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
  }).isRequired,
};

export default CalloutEntry;
