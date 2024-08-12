import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";
import { fallbackLng } from "@/lib/i18n/settings";

const CRAFT_HOMEPAGE_URI = "__home__";

export default function LanguageSelect({ id }) {
  const router = useRouter();
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const {
    localeInfo: { localized },
  } = useGlobalData();
  const [isPending, setPending] = useState(false);

  const isDefaultLocale = fallbackLng.includes(language);

  useEffect(() => {
    // Used for page transition
    const start = () => {
      setPending(true);
    };
    const end = () => {
      setPending(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  const getNewUriSegments = (newLanguage) => {
    const newLocale = localized.find((locale) =>
      locale.language.includes(newLanguage)
    );

    const uri = isDefaultLocale
      ? newLocale?.uri.replace("es/", "")
      : newLocale?.uri;

    if (uri === CRAFT_HOMEPAGE_URI) return "/";
    return uri;
  };

  const handleClick = () => {
    const newLocale = isDefaultLocale ? "es" : "en";
    const route = getNewUriSegments(newLocale);

    changeLanguage(newLocale);
    router.push({
      pathname: `/[locale]/${route}`,
      query: { locale: newLocale },
    });
  };

  return (
    <Styled.Fieldset>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor={id} $disabled={isPending}>
        <Styled.MobileLabelText role="presentation">
          {t("language-select-label")}
        </Styled.MobileLabelText>
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Styled.Switch
          id={id}
          checked={!isDefaultLocale}
          aria-disabled={isPending}
          onClick={handleClick}
        />
      </Styled.Label>
    </Styled.Fieldset>
  );
}

LanguageSelect.propTypes = {
  id: PropTypes.string.isRequired,
};
