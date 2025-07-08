"server-only";
import { revalidatePath } from "next/cache";
import { env } from "@/env";
import indexNow from "@/services/revalidation/indexNow";
import additionalRevalidations from "@/services/revalidation/additional";
import { languages } from "@/lib/i18n/settings";
import { getPathname } from "@/lib/i18n/navigation";
import { isDefaultLocale } from "@/lib/i18n";

const CRAFT_HOMEPAGE_URI = "__home__";
const ENV = env.CLOUD_ENV;

const revalidate = (uri: string) => {
  const paths: Array<string> = [];
  const tagCollection = new Set<string>();

  console.info(
    "[CLIENT_REVALIDATE_STATUS] Inside of revalidate endpoint: /services/revalidation/index"
  );

  languages.forEach((locale) => {
    console.info(`[CLIENT_REVALIDATE_STATUS] Revalidating for: ${locale}`);
    const parts: Array<string> =
      uri === CRAFT_HOMEPAGE_URI ? [] : uri.split("/");

    const path = getPathname({
      href: `/${parts.join("/")}`,
      locale,
      forcePrefix: !isDefaultLocale(locale),
    });

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
