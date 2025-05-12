import { type InitOptions } from "i18next";
import { defaultNS, fallbackLng, languages } from "./settings";
import { env } from "@/env";

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: env.NODE_ENV === "development" && typeof window !== "undefined",
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
      loadPath: `${env.NEXT_PUBLIC_BASE_URL}/localeStrings/{{lng}}/{{ns}}.json`,
    },
  };
}
