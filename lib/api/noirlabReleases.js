import useSWR from "swr";
import { useMemo } from "react";
import { getLocaleString } from "@/lib/helpers/site";
import { makeReleaseFeature } from "@/lib/utils";

// const RELEASE_URL = process.env.NEXT_PUBLIC_RELEASE_URL;

export function useRelease(site, entry) {
  const locale = getLocaleString(site);

  const fetcher = (release) => {
    const { pressReleaseId } = release;
    if (!pressReleaseId) return entry;

    const releaseUrl = `https://noirlab.edu/public/api/v2/releases/${pressReleaseId}/?lang=${locale}&translation_mode=fallback`;

    return fetch(releaseUrl).then((response) =>
      response.json().then((releaseData) => {
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
      })
    );
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
    const f = (release) => {
      const releaseUrl = `https://noirlab.edu/public/api/v2/releases/${release.pressReleaseId}/?lang=${locale}&translation_mode=fallback`;

      return fetch(releaseUrl).then((response) =>
        response.json().then((releaseData) => {
          const { title, image = [] } = release;
          const {
            images,
            description: releaseDescription,
            title: releaseTitle,
            url,
          } = releaseData;
          return {
            ...releaseData,
            ...release,
            image:
              image.length > 0
                ? [...makeReleaseFeature(images, "screen640"), ...image]
                : makeReleaseFeature(images, "screen640"),
            releaseDescription,
            title: releaseTitle || title,
            releaseUrl: url,
          };
        })
      );
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
