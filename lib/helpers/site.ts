export const getSiteFromLocale = (locale: string) => {
  return locale.includes("en") ? "default" : "es";
};

export function getLocaleString(site: string) {
  return site.toLowerCase() === "default" ? "en" : site.toLowerCase();
}
