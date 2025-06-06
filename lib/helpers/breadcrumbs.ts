import getRootPages from "@/services/craft/globals/rootPages";
import { fallbackLng } from "../i18n/settings";

export const getCustomBreadcrumbs = ({
  header,
  rootPages = [],
}: {
  rootPages: Awaited<ReturnType<typeof getRootPages>>;
  header: string;
}) => {
  const customBreadcrumbs = rootPages
    ?.filter((p) => p && p.header?.includes(header))
    .map((p) => p?.pageEntry);

  return customBreadcrumbs ? customBreadcrumbs.flat(1) : undefined;
};

export const makeBreadcrumbs = ({
  uri,
  title,
  locale = fallbackLng,
}: {
  uri: string;
  title: string;
  locale?: string;
}): Array<InternalLink> => {
  const segments = uri.split("/");

  return segments.map((crumb, i) => {
    const isLast = i === segments.length - 1;
    const parts = segments.slice(0, i + 1);

    return {
      id: `${i}`,
      uri: parts.join("/"),
      title: isLast
        ? title
        : crumb
            .replace("-", " ")
            .replace(/(^|\s)\S/g, (t) => t.toLocaleUpperCase(locale)),
    };
  });
};
