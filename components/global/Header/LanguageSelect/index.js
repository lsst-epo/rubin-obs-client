import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { fallbackLng } from "@/lib/i18n/settings";

const filterSearchParams = (searchParams) => {
  const filteredParams = [];

  searchParams.forEach((value, key) => {
    if (key !== "locale" && key !== "uriSegments") {
      filteredParams.push(`${key}=${value}`);
    }
  });

  return `?${filteredParams.join("&")}`;
};

export default function LanguageSelect({ id }) {
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
      changeLanguage(newLocale);
      setLoading(true);
      router.replace(route, { scroll: false });
    }
  };

  return (
    <Styled.Fieldset>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor={id} $disabled={isLoading}>
        <Styled.MobileLabelText role="presentation">
          {t("language-select-label")}
        </Styled.MobileLabelText>
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
  id: PropTypes.string.isRequired,
};
