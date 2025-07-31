import useSWR from "swr";
import { useMemo } from "react";
import { getLocaleString } from "@/lib/helpers/site";
import { NOIRLabServices, makeReleaseFeature } from "./noirlab";

export function useRelease(site, entry) {
  const locale = getLocaleString(site);

  const fetcher = (release) => {
    const { pressReleaseId, postType } = release;

    if (!pressReleaseId) return entry;

    const { slug } = postType[0];

    return NOIRLabServices[slug]({
      path: {
        id: pressReleaseId,
      },
      query: {
        lang: locale,
        translation_mode: "fallback",
      },
    }).then(({ data: releaseData }) => {
      const { title } = release;
      const {
        description: releaseDescription,
        title: releaseTitle,
        url,
      } = releaseData;

      return {
        ...releaseData,
        ...release,
        releaseDescription,
        title: releaseTitle || title,
        releaseUrl: url,
      };
    });
  };

  const { data: entryWithRelease, error } = useSWR(entry, fetcher);

  return {
    data: entryWithRelease,
    isLoading: !error && !entryWithRelease,
    isError: error,
  };
}

export function useReleases(site, entries = []) {
  const locale = getLocaleString(site);
  const releaseEntries = useMemo(
    () => entries.filter((entry) => entry.pressReleaseId),
    [entries]
  );

  function fetcher(...releaseEntries) {
    const f = async (entry) => {
      const { pressReleaseId, postType } = entry;
      const { slug } = postType[0];
      const { data } = await NOIRLabServices[slug]({
        path: {
          id: pressReleaseId,
        },
        query: {
          lang: locale,
          translation_mode: "fallback",
        },
      });

      if (data) {
        const { title, image = [] } = entry;
        const {
          images,
          description: releaseDescription,
          title: releaseTitle,
          url,
        } = data;
        return {
          ...data,
          ...entry,
          image:
            image.length > 0
              ? [...makeReleaseFeature(images, "screen640"), ...image]
              : makeReleaseFeature(images, "screen640"),
          releaseDescription,
          title: releaseTitle || title,
          releaseUrl: url,
        };
      }

      return entry;
    };

    if (releaseEntries.length > 1) {
      return Promise.all(releaseEntries.map(f));
    }

    return f(releaseEntries[0]);
  }

  const { data: releases, error } = useSWR(releaseEntries, fetcher);

  if (Array.isArray(releases)) {
    releases.forEach((release) => {
      const entryIndex = entries.findIndex((entry) => entry.id === release.id);
      entries[entryIndex] = release;
    });
  } else if (releases) {
    const entryIndex = entries.findIndex((entry) => entry.id === releases.id);
    entries[entryIndex] = releases;
  }

  return {
    entries,
    isLoading: !error && !entries,
    isError: error,
  };
}
