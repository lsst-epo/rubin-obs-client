/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  makeDateString,
  useGlobalData,
  getSiteString,
  makeReleaseFeature,
} from "@/lib/utils";
import * as Styled from "./styles";
import { Image } from "@rubin-epo/epo-react-lib";
import { useRelease } from "@/lib/api/noirlabReleases";

const getDateString = (newsDate, eventStart, eventEnd, lang) => {
  if (newsDate) {
    return makeDateString(newsDate, lang);
  }

  if (eventStart && eventEnd) {
    return `${makeDateString(eventStart, lang)} - ${makeDateString(
      eventEnd,
      lang
    )}`;
  }

  if (eventEnd) {
    return makeDateString(eventEnd, lang);
  }
};

export default function CalloutEntry({ callout }) {
  const { t } = useTranslation();
  const localeInfo = useGlobalData("localeInfo");
  const lang = localeInfo?.language || "en-US";
  const { id, entry, backgroundColor } = callout;
  // mix in the noirlabReleases from additional fetch to different endpoint
  const { data: entryWithRelease } = useRelease(getSiteString(lang), entry[0]);

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
    image: featureImage,
    images: releaseImages,
    entryType,
  } = entryWithRelease || entry[0];
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(
    date || releaseDate,
    startDate,
    endDate,
    lang
  );
  const calloutImage =
    featureImage?.[0] ||
    makeReleaseFeature(releaseImages, "thumb700x")?.[0] ||
    hero?.[0];

  return (
    <Styled.Section $bgColor={backgroundColor} $width="full" $overlay={false}>
      <Styled.Inner href={url} aria-labelledby={titleId}>
        {calloutImage && (
          <Styled.ImageWrapper>
            <Image role="presentation" ratio="4:3" image={calloutImage} />
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
          <Styled.FooterButton className={`c-buttonish c-buttonish--inert`}>
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
