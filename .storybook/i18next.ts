import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const supportedLngs = ["en", "es"];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string, callback) => {
      import(`../lib/i18n/localeStrings/${language}/${namespace}.json`)
        .then(({ default: resources }) => {
          callback(null, resources);
        })
        .catch((error) => {
          callback(error, null);
        });
    })
  )
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
  });

export default i18n;
