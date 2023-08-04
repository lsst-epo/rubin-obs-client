import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useAstroweather() {
  const { data, error } = useSWR(`/api/astroweather`, fetcher, {
    refreshInterval: 60000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
