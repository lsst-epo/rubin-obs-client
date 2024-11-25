import { FunctionComponent } from "react";
import classNames from "classnames";
import Link from "next/link";
import Picture from "@rubin-epo/epo-react-lib/Picture";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import { getLogos } from "@/lib/api/globals";
import { fallbackLng } from "@/lib/i18n/settings";
import { isDefaultLocale, useTranslation } from "@/lib/i18n";
import styles from "./styles.module.css";
interface LogoProps {
  className?: string;
  locale?: string;
}

const Logo: FunctionComponent<LogoProps> = async ({
  className,
  locale = fallbackLng,
}) => {
  const logos = await getLogos();
  const { t } = await useTranslation(locale);

  if (!logos) {
    return null;
  }

  const { large, small } = logos;

  const homeUrl = isDefaultLocale(locale) ? "/" : `/${locale}`;

  const sources = [
    {
      mediaCondition: `(min-width: ${tokens.BREAK_HEADER_LAYOUT})`,
      width: large.width,
      height: large.height,
      srcSet: large.srcSet || "",
    },
  ];

  if (small) {
    sources.push({
      mediaCondition: `(max-width: ${tokens.BREAK_HEADER_LAYOUT})`,
      width: small.width,
      height: small.height,
      srcSet: small.srcSet || "",
    });
  }

  return (
    <Link
      prefetch={false}
      href={homeUrl}
      className={classNames(styles.logoWrapper, className)}
    >
      <Picture
        className={styles.logo}
        sources={sources}
        image={{
          url: large.src,
          width: large.width,
          height: large.height,
          altText: t("homepage"),
          priority: true,
        }}
      />
    </Link>
  );
};

Logo.displayName = "Molecule.Logo";

export default Logo;
