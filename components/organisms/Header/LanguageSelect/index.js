"use client";
import PropTypes from "prop-types";
import { useEffect, useId, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { fallbackLng } from "@/lib/i18n/settings";
import * as Styled from "./styles";

const filterSearchParams = (searchParams) => {
  const filteredParams = [];

  searchParams.forEach((value, key) => {
    if (key !== "locale" && key !== "uriSegments") {
      filteredParams.push(`${key}=${value}`);
    }
  });

  return `?${filteredParams.join("&")}`;
};

export default function LanguageSelect({ className }) {
  const id = useId();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    t,
    i18n: { changeLanguage, resolvedLanguage: locale },
  } = useTranslation();

  const isDefaultLocale = fallbackLng.includes(locale);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleClick = () => {
    const newLocale = isDefaultLocale ? "es" : "en";

    if (newLocale !== locale) {
      const parts = pathname?.split("/") || [];
      parts.shift();

      if (locale !== fallbackLng) {
        parts.shift();
      }

      const route = `/${newLocale}/${parts.join("/")}${filterSearchParams(
        searchParams
      )}`;
      setLoading(true);
      router.replace(route, { scroll: false });
      changeLanguage(newLocale);
    }
  };

  return (
    <Styled.Fieldset className={className}>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor={id} $disabled={isLoading}>
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Styled.Switch
          id={id}
          checked={!isDefaultLocale}
          onClick={handleClick}
          aria-disabled={isLoading}
        />
      </Styled.Label>
    </Styled.Fieldset>
  );
}

LanguageSelect.propTypes = {
  className: PropTypes.string,
};
