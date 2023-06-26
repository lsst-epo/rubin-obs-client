import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default async function useEfd(type) {
  const { data, error } = useSWR(`/api/efd/${type}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
