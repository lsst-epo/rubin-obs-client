import useSWR from "swr";

const RELEASE_URL = process.env.NEXT_PUBLIC_PRESS_RELEASE_URL_EN;

export async function getRelease(site, id) {
  const releaseUrl = RELEASE_URL.replace("{{ID}}", id);
  const response = await fetch(releaseUrl);
  const release = await response.json();
  return release;
}

export function useReleases(site, section, entries = []) {
  const releaseEntries = entries.filter((entry) => entry.pressReleaseId);

  const getRel = (url) => fetch(url).then((res) => res.json());

  function fetcher(...releaseEntries) {
    const f = (release) => {
      const releaseUrl = RELEASE_URL.replace("{{ID}}", release.pressReleaseId);

      return fetch(releaseUrl).then((response) =>
        response.json().then((releaseData) => {
          const { description, title } = release;
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
