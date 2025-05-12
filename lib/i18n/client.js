import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  defaultNS,
  languages,
  namespaces,
  cookieName,
  fallbackLng,
} from "./settings";
import { getOptions } from "./options";
import { loadResources } from "./index";

const runsOnServerSide = typeof window === "undefined";

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
      order: ["htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export default function useClientTranslation(
  lng = fallbackLng,
  ns = defaultNS,
  options
) {
  const instance = useTranslation(ns, options);
  const { i18n } = instance;

  if (runsOnServerSide && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  return instance;
}
