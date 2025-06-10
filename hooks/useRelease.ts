import { useLocale } from "next-intl";
import useSWR from "swr";
import { NOIRLabServices } from "@/lib/api/noirlab";

export default function useRelease(entry: any) {
  const locale = useLocale();

  const fetcher = (release: any) => {
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
