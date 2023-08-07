import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    mode: "no-cors",
  }).then((res) => {
    return res;
  });

export default function useEfd() {
  const url = process.env.EFD_URL;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    console.info("ERROR");
  }
  if (isLoading) {
    console.info("LOADING");
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
