import { FC } from "react";
import Image, { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import { FragmentType, useFragment } from "@/gql";
import { CalloutNewsFragment, CalloutNewsFragmentDoc } from "@/gql/graphql";
import { Announcement, Release } from "@/services/noirlab";
import { makeReleaseFeature, NOIRLabServices } from "@/lib/api/noirlab";
import { makeDateString } from "@/helpers/dates";
import { isDarkMode } from "@/helpers/styles";
import { useTranslation } from "@/lib/i18n";
import RichTextContent from "@/components/atomic/RichTextContent";
import * as Styled from "./styles";

const getDateString = (newsDate, locale) => {
  if (newsDate) {
    return makeDateString(newsDate, { locale });
  }
};

const addNOIRlabContent = async ({
  id,
  slug,
  locale,
}: {
  id: string | null;
  slug?: string | null;
  locale: string;
}): Promise<Announcement | Release | undefined> => {
  if (!id || !slug || !Object.keys(NOIRLabServices).includes(slug)) return;

  const { data, error } = await NOIRLabServices[slug]({
    path: { id },
    query: {
      lang: locale,
      translation_mode: "fallback",
    },
  });

  if (!error) {
    return data;
  }
};

interface CalloutNewsProps {
  callout: FragmentType<typeof CalloutNewsFragmentDoc>;
  locale: string;
}

const CalloutNews: FC<CalloutNewsProps> = async ({ callout, locale }) => {
  const { t } = await useTranslation();
  const {
    id,
    entry: [entry],
    backgroundColor,
  } = useFragment<CalloutNewsFragment>(CalloutNewsFragmentDoc, callout);
  if (!entry || entry.__typename !== "news_post_Entry") return null;

  const { pressReleaseId, postType } = entry;

  const noirlabContent = await addNOIRlabContent({
    id: pressReleaseId,
    slug: postType[0]?.slug,
    locale,
  });

  const { title, date, url, hero, image, entryType } = entry;
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(
    date || noirlabContent?.release_date,
    locale
  );
  const calloutImage = noirlabContent?.images
    ? makeReleaseFeature(noirlabContent.images, "screen640")?.[0]
    : (image?.[0] as ImageShape) || (hero?.[0] as ImageShape);

  const darkMode = isDarkMode(backgroundColor);

  const subtitle = entry?.description || noirlabContent?.subtitle;

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
        {subtitle && <RichTextContent text={subtitle} />}
        <Styled.Footer>
          <Styled.FooterButton
            href={url ?? undefined}
            aria-labelledby={titleId}
            className={`c-buttonish c-buttonish--inert`}
          >
            {t("read-more")}
          </Styled.FooterButton>
        </Styled.Footer>
      </Styled.Inner>
      {typeSlug === "news-post" && (
        <Styled.SharePopup title={title ?? undefined} url={url ?? undefined} />
      )}
    </Styled.Section>
  );
};

CalloutNews.displayName = "ContentBlock.Callout.News";

export default CalloutNews;
