import { addLocaleUriSegment } from "../i18n";
import { fallbackLng } from "../i18n/settings";

export const buildParentPath = ({
  locale = fallbackLng,
  gallery,
  includeParentSlug = true,
}: {
  gallery: string;
  locale: string;
  includeParentSlug: boolean;
}) => {
  const slugs = ["gallery"];

  if (includeParentSlug) {
    slugs.push("collections");
    slugs.push(gallery);
  }

  return addLocaleUriSegment(locale, slugs.join("/"));
};
