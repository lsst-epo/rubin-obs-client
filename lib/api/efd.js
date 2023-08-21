import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });

export default function useEfd() {
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_EFD_URL, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
}
