import { languages } from "@/lib/i18n/settings";

export const getSiteFromLocale = (locale: string) => {
  const normalizedLocale = locale.toLowerCase();

  if ((languages as readonly string[]).includes(normalizedLocale)) {
    return locale.toLowerCase();
  } else {
    return "default";
  }
};

export function getLocaleString(site: string) {
  return site.toLowerCase() === "default" ? "en" : site.toLowerCase();
}
