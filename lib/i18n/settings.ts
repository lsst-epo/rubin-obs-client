import { InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng, "es"] as const;
export const defaultNS = "translation";
export const namespaces = [defaultNS];
export const cookieName = "NEXT_LOCALE";
export type Locale = (typeof languages)[number];

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug:
      process.env.NODE_ENV === "development" && typeof window !== "undefined",
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    load: "languageOnly",
    react: {
      transSupportBasicHtmlNodes: true,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${process.env.NEXT_PUBLIC_BASE_URL}/localeStrings/{{lng}}/{{ns}}.json`,
    },
  };
}
