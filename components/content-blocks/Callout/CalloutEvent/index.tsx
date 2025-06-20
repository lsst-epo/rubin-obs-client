import { FC } from "react";
import Image from "@rubin-epo/epo-react-lib/Image";
import { FragmentType, useFragment } from "@/gql";
import { CalloutEventFragment, CalloutEventFragmentDoc } from "@/gql/graphql";
import { makeDateString } from "@/helpers/dates";
import { isDarkMode } from "@/helpers/styles";
import { useTranslation } from "@/lib/i18n";
import * as Styled from "./styles";

const getDateString = (eventStart, eventEnd, locale) => {
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

interface CalloutEventProps {
  callout: FragmentType<typeof CalloutEventFragmentDoc>;
  locale: string;
}

const CalloutEvent: FC<CalloutEventProps> = async ({ callout, locale }) => {
  const { t } = await useTranslation();
  const {
    id,
    entry: [entry],
    backgroundColor,
  } = useFragment<CalloutEventFragment>(CalloutEventFragmentDoc, callout);

  if (!entry || entry.__typename !== "events_events_Entry") return null;

  const {
    title,
    startDate,
    endDate,
    url,
    description,
    hero,
    image,
    entryType,
  } = entry;
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(startDate, endDate, locale);
  const calloutImage = image?.[0] || hero?.[0];

  const darkMode = isDarkMode(backgroundColor);

  return (
    <Styled.Section
      style={{ "--color-background-section": `var(--${backgroundColor})` }}
      data-dark-mode={darkMode}
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
    </Styled.Section>
  );
};

CalloutEvent.displayName = "ContentBlock.Callout.Event";

export default CalloutEvent;
