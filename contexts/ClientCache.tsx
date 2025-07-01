"use client";
import { API_URL, options } from "@/lib/api/client";
import { retryExchange } from "@urql/exchange-retry";
import { FC, PropsWithChildren, useMemo } from "react";
import { SWRConfig } from "swr";
import {
  UrqlProvider,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  createClient,
} from "@urql/next";

const isClient = typeof window !== "undefined";

const ClientCache: FC<PropsWithChildren> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient,
    });
    const client = createClient({
      url: API_URL,
      exchanges: [cacheExchange, ssr, fetchExchange, retryExchange(options)],
      suspense: false,
      fetchOptions: { cache: isClient ? "default" : "no-store" },
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <SWRConfig>{children}</SWRConfig>
    </UrqlProvider>
  );
};

export default ClientCache;
