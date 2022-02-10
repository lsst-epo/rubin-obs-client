import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

const CRAFT_HOMEPAGE_URI = "__home__";
export default function LanguageSelect() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    localeInfo: { language: currentLanguage, localized },
  } = useGlobalData();
  const [toEs, setToEs] = useState(currentLanguage !== "en-US");
  const switchCount = useRef(0);

  useEffect(() => {
    // don't run effect for change to `toEs` on mount
    if (switchCount.current > 0) {
      const newLang = toEs ? "es" : "en-US";
      const newRoute = getNewRoute(newLang);
      if (!newRoute) return null;
      router.push(newRoute);
    }

    switchCount.current++;
  }, [toEs]); // eslint-disable-line react-hooks/exhaustive-deps

  const getNewRoute = (newLanguage) => {
    const newLocale = localized.find(
      (locale) => locale.language === newLanguage
    );
    const uri = newLocale?.uri;
    if (uri === CRAFT_HOMEPAGE_URI) return "/";
    return uri;
  };

  const handleClick = () => {
    setToEs((prevValue) => !prevValue);
  };

  return (
    <fieldset>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor="langSelect">
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Styled.Switch
          id="langSelect"
          role="switch"
          aria-checked={toEs}
          onClick={handleClick}
        >
          <Styled.Toggle aria-hidden />
          <Styled.Inner aria-hidden />
        </Styled.Switch>
      </Styled.Label>
    </fieldset>
  );
}

LanguageSelect.displayName = "Global.LanguageSelect";
