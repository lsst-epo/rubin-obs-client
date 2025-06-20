import { FC } from "react";
import Image from "@rubin-epo/epo-react-lib/Image";
import { FragmentType, useFragment } from "@/gql";
import { CalloutNewsFragment, CalloutNewsFragmentDoc } from "@/gql/graphql";
import { Announcement, Release } from "@/services/noirlab";
import { makeReleaseFeature, NOIRLabServices } from "@/lib/api/noirlab";
import { makeDateString } from "@/helpers/dates";
import { isDarkMode } from "@/helpers/styles";
import { useTranslation } from "@/lib/i18n";
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
  // mix in the noirlabReleases from additional fetch to different endpoint
  // const { data: entryWithRelease } = useRelease(
  //   getSiteString(language),
  //   entry[0]
  // );
  // console.log({ entryWithRelease });

  if (!entry || entry.__typename !== "news_post_Entry") return null;

  const { pressReleaseId, postType } = entry;

  const noirlabContent = await addNOIRlabContent({
    id: pressReleaseId,
    slug: postType[0]?.slug,
    locale,
  });

  const {
    title,
    date,
    release_date: releaseDate,
    url,
    description,
    subtitle,
    hero,
    image,
    images: releaseImages,
    entryType,
  } = entry;
  const { title: type, slug: typeSlug } = entryType[0];
  const titleId = `${typeSlug}-${id}`;
  const calloutDateString = getDateString(date || releaseDate, locale);
  const calloutImage =
    image?.[0] ||
    makeReleaseFeature(releaseImages, "screen640")?.[0] ||
    hero?.[0];

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
      {typeSlug === "news-post" && (
        <Styled.SharePopup title={title} url={url} />
      )}
    </Styled.Section>
  );
};

CalloutNews.displayName = "ContentBlock.Callout.News";

export default CalloutNews;
