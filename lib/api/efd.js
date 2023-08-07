import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res;
    })
    .error(() => {
      console.log("errorrr");
    })
    .finally(() => {
      console.log("finally");
    });

export default function useEfd() {
  const url = process.env.NEXT_PUBLIC_EFD_URL;

  console.log({ url });

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
