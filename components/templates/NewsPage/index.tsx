import { FunctionComponent } from "react";
import sanitizeHtml, { defaults, IOptions } from "sanitize-html";
import { env } from "@/env";
import { AnnouncementsService, ReleasesService } from "@/services/noirlab";
import { Locale } from "@/lib/i18n/settings";
import NewsPageClient from "./client";

const sanitize = (dirty: string | undefined) => {
  if (typeof dirty === "undefined") return;

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
    return undefined;
  }
};

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
        releaseDescription: sanitize(description),
        links: sanitize(links),
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
        releaseDescription: sanitize(description),
        moreInformation: sanitize(moreInformation),
        links: sanitize(links),
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
