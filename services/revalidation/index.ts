"server-only";
import { revalidatePath } from "next/cache";
import { env } from "@/env";
import indexNow from "@/services/revalidation/indexNow";
import additionalRevalidations from "@/services/revalidation/additional";
import { languages } from "@/lib/i18n/settings";
import { getPathname } from "@/lib/i18n/navigation";

const CRAFT_HOMEPAGE_URI = "__home__";
const ENV = env.CLOUD_ENV;

const revalidate = (uri: string) => {
  const paths: Array<string> = [];
  const tagCollection = new Set<string>();

  languages.forEach((locale) => {
    const parts: Array<string> =
      uri === CRAFT_HOMEPAGE_URI ? [] : uri.split("/");

    const path = getPathname({ href: parts.join("/"), locale });

    paths.push(path);

    revalidatePath(path);
    additionalRevalidations({ parts, tagCollection });
  });

  if (ENV === "PROD") {
    indexNow(uri);
  }

  return { paths, tags: Array.from(tagCollection) };
};

export default revalidate;
