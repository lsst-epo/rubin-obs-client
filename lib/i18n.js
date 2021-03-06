import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { localeData } from "./localeStrings";

export const updateI18n = (lang) => {
  i18n.language !== lang && i18n.changeLanguage(lang);
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: true,
    lng: "en",
    resources: localeData,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: {
      default: ["en"],
    },
    react: {
      transSupportBasicHtmlNodes: true,
    },
  });

export default i18n;
