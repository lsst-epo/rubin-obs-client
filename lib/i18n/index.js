import resourcesToBackend from "i18next-resources-to-backend";

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
        import(`../../public/localeStrings/${language}/${namespace}.json`)
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
