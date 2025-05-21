"use client";
import { FC, useEffect, useId, useTransition } from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";
import Switch from "@rubin-epo/epo-react-lib/Switch";
import { useRouter, usePathname, redirect } from "@/lib/i18n/navigation";
import { useTranslation } from "react-i18next";
import { fallbackLng } from "@/lib/i18n/settings";
import styles from "./styles.module.css";

const LanguageSelect: FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    if (!isPending) {
      changeLanguage(locale);
      router.refresh();
    }
  }, [isPending]);

  const isDefaultLocale = fallbackLng.includes(locale);

  const handleClick = () => {
    const newLocale = isDefaultLocale ? "es" : "en";

    if (newLocale !== locale) {
      startTransition(() => {
        redirect({ href: { pathname }, locale: newLocale, forcePrefix: true });
      });
    }
  };

  return (
    <fieldset
      data-cy="localeToggle"
      className={clsx(styles.fieldset, className)}
      disabled={isPending}
    >
      <legend className="a-hidden">{t("localize-content")}</legend>
      <label className={styles.label} htmlFor={id}>
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Switch
          id={id}
          className={styles.switch}
          checked={!isDefaultLocale}
          onClick={handleClick}
          aria-disabled={isPending}
        />
      </label>
    </fieldset>
  );
};

LanguageSelect.displayName = "Organism.Header.LanguageSelect";

export default LanguageSelect;
