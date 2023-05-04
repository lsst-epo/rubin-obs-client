/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeDateString, useGlobalData } from "@/lib/utils";
import { Text } from "../styles";
import {
  Section,
  Inner,
  SharePopup,
  ImageWrapper,
  ImageSticker,
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
    uri,
    description,
    image,
    entryType,
  } = entry[0];
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(date, startDate, endDate, lang);

  return (
    <Section $bgColor={backgroundColor} $width="full" $overlay={false}>
      <Inner href={uri} aria-labelledby={titleId}>
        {image.length && (
          <ImageWrapper className="image">
            <Image role="presentation" ratio="4:3" image={image[0]} />
            <ImageSticker>{type}</ImageSticker>
          </ImageWrapper>
        )}
        <h2 className="title" id={titleId}>
          {title}
        </h2>
        {calloutDateString && (
          <div className="subtitle t-heading-quaternary">
            {calloutDateString}
          </div>
        )}
        {description && (
          <Text
            className="text c-content-rte"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <div className="footer">
          <div className={`c-buttonish c-buttonish--inert`}>
            {t("read-more")}
          </div>
        </div>
      </Inner>
      {typeSlug === "news-post" && <SharePopup title={title} url={uri} />}
    </Section>
  );
}

CalloutEntry.propTypes = {
  callout: PropTypes.shape({
    entry: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
  }).isRequired,
};
