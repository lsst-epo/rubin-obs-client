import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { languages, getOptions, namespaces, cookieName } from "./settings";
import { loadResources } from "./index";

const runsOnServerSide = typeof window === "undefined";

export const updateI18n = (lang) => {
  i18n.language !== lang && i18n.changeLanguage(lang);
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(loadResources)
  .init({
    ...getOptions(),
    ns: namespaces,
    fallbackNS: namespaces,
    lng: undefined, // let detect the language on client side
    detection: {
      excludeCacheFor: languages,
      lookupCookie: cookieName,
      order: ["htmlTag", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export default i18n;
