/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeDateString, useGlobalData } from "@/lib/utils";
import {
  StyledSection,
  StyledInner,
  StyledHeading,
  StyledSubheading,
  StyledText,
  StyledFooter,
  StyledFooterButton,
  StyledSharePopup,
  StyledImageWrapper,
  StyledImageSticker,
} from "./styles";
import { Image } from "@rubin-epo/epo-react-lib";

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
  const {
    title,
    date,
    startDate,
    endDate,
    url,
    description,
    image,
    entryType,
  } = entry[0];
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(date, startDate, endDate, lang);

  return (
    <StyledSection $bgColor={backgroundColor} $width="full" $overlay={false}>
      <StyledInner href={url} aria-labelledby={titleId}>
        {image.length && (
          <StyledImageWrapper>
            <Image role="presentation" ratio="4:3" image={image[0]} />
            <StyledImageSticker>{type}</StyledImageSticker>
          </StyledImageWrapper>
        )}
        <StyledHeading id={titleId}>{title}</StyledHeading>
        {calloutDateString && (
          <StyledSubheading className="t-heading-quaternary">
            {calloutDateString}
          </StyledSubheading>
        )}
        {description && (
          <StyledText
            className="c-content-rte"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <StyledFooter>
          <StyledFooterButton className={`c-buttonish c-buttonish--inert`}>
            {t("read-more")}
          </StyledFooterButton>
        </StyledFooter>
      </StyledInner>
      {typeSlug === "news-post" && <StyledSharePopup title={title} url={url} />}
    </StyledSection>
  );
}

CalloutEntry.propTypes = {
  callout: PropTypes.shape({
    entry: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
  }).isRequired,
};
