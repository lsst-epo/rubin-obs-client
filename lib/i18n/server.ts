"server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { cookieName, fallbackLng } from "./settings";

export const getLocale = cache(() => {
  return (
    headers().get("x-next-i18n-router-locale") ||
    cookies().get(cookieName)?.value ||
    fallbackLng
  );
});
