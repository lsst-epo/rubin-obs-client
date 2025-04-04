import "@/styles/styles.scss";
import globalDecorators from "./decorators";
import i18n from "./i18next";

const preview = {
  parameters: {
    i18n,
  },

  tags: ["autodocs"],

  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      es: "Español",
    },
  },
};
export default preview;

export const decorators = globalDecorators;
