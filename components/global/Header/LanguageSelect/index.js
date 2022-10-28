import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

const CRAFT_HOMEPAGE_URI = "__home__";

export default function LanguageSelect({ id }) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    localeInfo: { language: currentLanguage, localized },
  } = useGlobalData();
  const [toEs, setToEs] = useState(currentLanguage !== "en-US");
  const [loading, setLoading] = useState(false);
  const switchCount = useRef(0);

  useEffect(() => {
    // don't run effect for change to `toEs` on mount
    if (switchCount.current > 0) {
      const newLang = toEs ? "es" : "en-US";
      const newRoute = getNewRoute(newLang);
      if (!newRoute) return;
      router.push(newRoute);
    }

    switchCount.current++;
  }, [toEs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(false);
  }, [currentLanguage]);

  const getNewRoute = (newLanguage) => {
    const newLocale = localized.find(
      (locale) => locale.language === newLanguage
    );
    const uri = newLocale?.uri;
    if (uri === CRAFT_HOMEPAGE_URI) return "/";
    return uri;
  };

  const handleClick = () => {
    if (!loading) {
      setToEs((prevValue) => !prevValue);
    }
    setLoading(true);
  };

  return (
    <Styled.Fieldset>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor={id} $disabled={loading}>
        <Styled.MobileLabelText role="presentation">
          {t("language-select-label")}
        </Styled.MobileLabelText>
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Styled.Switch
          id={id}
          checked={toEs}
          aria-disabled={loading}
          onClick={handleClick}
        />
      </Styled.Label>
    </Styled.Fieldset>
  );
}

LanguageSelect.displayName = "Global.LanguageSelect";

LanguageSelect.propTypes = {
  id: PropTypes.string.isRequired,
};
