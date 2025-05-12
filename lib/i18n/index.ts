import { getLocale } from "next-intl/server";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { fallbackLng } from "./settings";
import { getOptions } from "./options";

export const loadResources = resourcesToBackend(
  (language: string, namespace: string, callback) => {
    switch (namespace) {
      case "epo-react-lib":
        import(
          `@rubin-epo/epo-react-lib/localeStrings/${language}/${namespace}.json`
        )
          .then(({ default: resources }) => {
            callback(null, resources);
          })
          .catch((error) => {
            callback(error, null);
          });
        break;
      default:
        import(`./localeStrings/${language}/${namespace}.json`)
          .then(({ default: resources }) => {
            callback(null, resources);
          })
          .catch((error) => {
            callback(error, null);
          });
        break;
    }
  }
);

const initI18next = async (lng: string, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(loadResources)
    .init(getOptions(lng, ns));
  return i18nInstance;
};

async function useTranslation(
  lng?: string,
  ns: string | string[] = "translation",
  options: any = {}
) {
  const locale = lng || (await getLocale());
  const i18nextInstance = await initI18next(locale, ns);

  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

export const isDefaultLocale = (locale: string) => locale === fallbackLng;

const shiftToSegments = (segments: Array<string>) => {
  if (segments[0] === "") {
    segments.shift();
    shiftToSegments(segments);
  }
};

export const addLocaleUriSegment = (
  locale = fallbackLng,
  uri: string,
  options: {
    includeLeadingSlash?: boolean;
  } = { includeLeadingSlash: true }
) => {
  const segments = uri.split("/");

  shiftToSegments(segments);

  if (segments[0] === locale) {
    return segments.join("/");
  } else {
    if (!isDefaultLocale(locale)) {
      segments.unshift(locale);
    }

    const { includeLeadingSlash = true } = options;
    if (includeLeadingSlash) {
      segments.unshift("");
    }

    return segments.join("/");
  }
};

export { useTranslation, useTranslation as serverTranslation };
