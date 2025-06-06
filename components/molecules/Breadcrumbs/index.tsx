import { FC } from "react";
import { getPathname, Link } from "@/lib/i18n/navigation";
import { fallbackLng } from "@/lib/i18n/settings";
import clsx from "clsx";
import { BreadcrumbList, ListItem } from "schema-dts";
import { env } from "@/env";
import StructuredData from "@/components/atomic/StructuredData";
import { isDefaultLocale } from "@/lib/i18n";
import styles from "./styles.module.css";

interface BreadcrumbsProps {
  breadcrumbs: Array<InternalLink>;
  locale?: string;
  includesCurrentPage?: boolean;
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbs,
  locale = fallbackLng,
  includesCurrentPage = true,
  className,
}) => {
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;

  const structuredBreadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ uri, title }, i): ListItem => {
      return {
        "@type": "ListItem",
        position: i + 1,
        name: title,
        item:
          uri &&
          new URL(
            getPathname({
              href: `/${uri}`,
              locale,
              forcePrefix: !isDefaultLocale(locale),
            }),
            env.NEXT_PUBLIC_BASE_URL
          ).toString(),
      };
    }),
  };

  return (
    <>
      <StructuredData jsonLd={structuredBreadcrumbs} />
      <nav data-cy="breadcrumb" className={clsx(styles.breadcrumb, className)}>
        <ol className={styles.list}>
          {breadcrumbs.map(({ id, uri, title }, i) => {
            if (!uri) return null;

            return (
              <li className={styles.item} key={id}>
                <Link
                  className={styles.link}
                  href={`/${uri}`}
                  aria-current={
                    includesCurrentPage && i === breadcrumbs.length - 1
                      ? "page"
                      : undefined
                  }
                  prefetch={false}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

Breadcrumbs.displayName = "Molecule.Breadcrumbs";

export default Breadcrumbs;
