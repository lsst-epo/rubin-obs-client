import { FunctionComponent } from "react";
import sanitizeHtml, { defaults, IOptions } from "sanitize-html";
import { env } from "@/env";
import { AnnouncementsService, ReleasesService } from "@/services/noirlab";
import { Locale } from "@/lib/i18n/settings";
import NewsPageClient from "./client";
import { useTranslation } from "@/lib/i18n";

const sanitize = (dirty: string | undefined) => {
  if (typeof dirty === "undefined") return "";

  try {
    const { hostname: noirLabHostname } = new URL(
      `${env.NEXT_PUBLIC_NOIRLAB_BASE_URL}`
    );
    const sanitizeOptions: IOptions = {
      allowedTags: [...defaults.allowedTags, "iframe"],
      allowedAttributes: {
        ...defaults.allowedAttributes,
        iframe: ["src", "style", "width", "height", "allowfullscreen"],
      },
      allowedIframeHostnames: [noirLabHostname],
    };

    return sanitizeHtml(dirty, sanitizeOptions);
  } catch {
    return "";
  }
};

interface ContentBlockArgs {
  text: string;
  id: string;
}

const makeTextContentBlock = ({
  text,
  id,
}: ContentBlockArgs): {
  typeHandle: string;
  id: string;
  text: string;
  __typename: string;
} => {
  return {
    typeHandle: "text",
    text,
    id,
    __typename: "contentBlocksNews_text_BlockType",
  };
};

const makeBlockWithHeader = ({
  text,
  id,
  header,
}: ContentBlockArgs & { header: string }) => {
  return makeTextContentBlock({ text: `<h3>${header}</h3>${text}`, id });
};

const NewsPage: FunctionComponent<{
  section: string;
  data: PageEntry;
  locale: string;
}> = async ({ data, section, locale }) => {
  const { t } = await useTranslation(locale);
  const { postType, pressReleaseId } = data;
  const { slug } = postType[0];

  // Press Releases
  if (pressReleaseId) {
    if (slug === "press-release") {
      const { data: release } = await ReleasesService.releasesRetrieve({
        path: { id: pressReleaseId },
        query: {
          lang: locale as Locale,
          translation_mode: "fallback",
        },
      });

      if (release) {
        const {
          title,
          url,
          description,
          headline,
          subtitle,
          images,
          videos,
          id,
          more_information: moreInformation,
          links,
          contacts,
        } = release;

        const combinedData = {
          ...data,
          title,
          description: headline,
          subtitle,
          contentBlocksNews: [
            makeTextContentBlock({
              text: sanitize(description),
              id: `${id}-text`,
            }),
            makeBlockWithHeader({
              text: sanitize(moreInformation),
              id: `${id}-more-info`,
              header: t("news.more-info"),
            }),
            makeTextContentBlock({
              text: `<a href="${url}" target="_blank" rel="noopener noreferrer">
              ${t("news.release-link")}</a>`,
              id: `${id}-link`,
            }),
            makeBlockWithHeader({
              text: sanitize(links),
              id: `${id}-links`,
              header: t("news.links"),
            }),
          ],
          contacts,
          images,
          videos,
        };

        return <NewsPageClient data={combinedData} {...{ section, locale }} />;
      }
    } else {
      const { data: release } =
        await AnnouncementsService.announcementsRetrieve({
          path: { id: pressReleaseId },
          query: {
            lang: locale as Locale,
            translation_mode: "fallback",
          },
        });

      if (release) {
        const {
          title,
          url,
          description,
          subtitle,
          images,
          videos,
          links,
          contacts,
          id,
        } = release;

        const combinedData = {
          ...data,
          title,
          subtitle,
          contentBlocksNews: [
            makeTextContentBlock({
              text: sanitize(description),
              id: `${id}-text`,
            }),
            makeBlockWithHeader({
              text: `<a href="${url}" target="_blank" rel="noopener noreferrer">
              ${t("news.release-link")}</a>`,
              id: `${id}-more-info`,
              header: t("news.more-info"),
            }),
            makeBlockWithHeader({
              text: sanitize(links),
              id: `${id}-links`,
              header: t("news.links"),
            }),
          ],
          contacts,
          images,
          videos,
        };

        return <NewsPageClient data={combinedData} {...{ section, locale }} />;
      }
    }
  }

  // Craft news entries
  return <NewsPageClient {...{ data, section, locale }} />;
};

export default NewsPage;
