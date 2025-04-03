import getRootPages from "@/services/craft/globals/rootPages";

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
