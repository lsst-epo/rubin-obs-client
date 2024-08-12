import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { getOptions } from "./settings";

export const loadResources = resourcesToBackend(
  (language, namespace, callback) => {
    switch (namespace) {
      // case "epo-react-lib":
      //   import(
      //     `@rubin-epo/epo-react-lib/localeStrings/${language}/${namespace}.json`
      //   )
      //     .then(({ default: resources }) => {
      //       callback(null, resources);
      //     })
      //     .catch((error) => {
      //       callback(error, null);
      //     });
      //   break;
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

const initI18next = async (lng, ns) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(loadResources)
    .init(getOptions(lng, ns));
  return i18nInstance;
};

async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

export { useTranslation, useTranslation as serverTranslation };
