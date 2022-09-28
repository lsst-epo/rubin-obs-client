import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

/*
 * Fetch Canto gallery items (client-side, with prerendering via `fallbackData`)
 */
export default function useCantoAssets({
  albumId,
  fetchParams = { limit: 10 },
  fallbackData,
}) {
  if (!albumId)
    throw new Error('The parameter "albumId" is required to use this hook.');
  const router = useRouter();
  const {
    query: { page },
  } = router;
  const { limit, ...restFetchParams } = fetchParams;
  const start = page * limit - limit || 0;
  const params = new URLSearchParams({
    album_id: albumId,
    limit,
    start,
    ...restFetchParams,
  });
  const { data, error } = useSWR(
    `/api/canto-assets?${params.toString()}`,
    fetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
    }
  );

  const isLoading = !data?.results?.length;
  const isError = error || data?.error;

  return {
    data: {
      results: data?.results || [],
      limit,
      start,
      total: data?.found,
    },
    isLoading,
    isError,
  };
}
