"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  /**
   * @param {Record<string, any>} params
   */
  function setQueryParams(params, push = false) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    if (push) {
      router.push(`${pathname}${query}`);
    } else {
      router.replace(`${pathname}${query}`);
    }
  }

  function clearQueryParams(push = false) {
    if (push) {
      router.push(pathname);
    } else {
      router.replace(pathname);
    }
  }

  return { queryParams: searchParams, setQueryParams, clearQueryParams };
}
