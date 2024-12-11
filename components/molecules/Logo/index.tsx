import { FunctionComponent } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ImgProps } from "next/dist/shared/lib/get-img-props";
import Picture from "@rubin-epo/epo-react-lib/Picture";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import { fallbackLng } from "@/lib/i18n/settings";
import { isDefaultLocale, useTranslation } from "@/lib/i18n";
import styles from "./styles.module.css";
interface LogoProps {
  large: ImgProps;
  small?: ImgProps;
  className?: string;
  locale?: string;
}

const Logo: FunctionComponent<LogoProps> = async ({
  large,
  small,
  className,
  locale = fallbackLng,
}) => {
  const { t } = await useTranslation(locale);

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
