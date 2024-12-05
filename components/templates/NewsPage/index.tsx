import { FunctionComponent } from "react";
import sanitizeHtml from "sanitize-html";
import {
  AnnouncementsService,
  ReleasesService,
} from "@/lib/api/noirlab/codegen";
import { Locale } from "@/lib/i18n/settings";
import NewsPageClient from "./client";

const NewsPage: FunctionComponent<{
  section: string;
  data: PageEntry;
  locale: string;
}> = async ({ data, section, locale }) => {
  const { postType, pressReleaseId } = data;
  const { slug } = postType[0];

  // Announcements
  if (slug !== "feature" && pressReleaseId) {
    const { data: release, error } =
      await AnnouncementsService.announcementsRetrieve({
        path: { id: pressReleaseId },
        query: {
          lang: locale as Locale,
          translation_mode: "fallback",
        },
      });

    if (!error && release) {
      const {
        title,
        url: releaseUrl,
        description,
        subtitle,
        images,
        videos,
        links,
        contacts,
      } = release;

      const combinedData = {
        ...data,
        title,
        releaseUrl,
        subtitle,
        releaseDescription: description ? sanitizeHtml(description) : undefined,
        links: links ? sanitizeHtml(links) : links,
        contacts,
        images,
        videos,
      };

      return <NewsPageClient data={combinedData} {...{ section, locale }} />;
    }
  }

  // Press Releases
  if (slug === "press-release" && pressReleaseId) {
    const { data: release, error } = await ReleasesService.releasesRetrieve({
      path: { id: pressReleaseId },
      query: {
        lang: locale as Locale,
        translation_mode: "fallback",
      },
    });

    if (!error && release) {
      const {
        title,
        url: releaseUrl,
        description,
        headline,
        subtitle,
        images,
        videos,
        more_information: moreInformation,
        links,
        contacts,
      } = release;

      const combinedData = {
        ...data,
        title,
        releaseUrl,
        headline,
        subtitle,
        releaseDescription: description ? sanitizeHtml(description) : undefined,
        moreInformation: moreInformation
          ? sanitizeHtml(moreInformation)
          : undefined,
        links: links ? sanitizeHtml(links) : links,
        contacts,
        images,
        videos,
      };

      return <NewsPageClient data={combinedData} {...{ section, locale }} />;
    }
  }

  // Craft news entries
  return <NewsPageClient {...{ data, section, locale }} />;
};

export default NewsPage;
