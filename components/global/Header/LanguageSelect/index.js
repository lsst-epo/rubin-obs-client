import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import { respond } from "@/styles/globalStyles";

const CRAFT_HOMEPAGE_URI = "__home__";
export default function LanguageSelect() {
  const router = useRouter();
  const { t } = useTranslation();
  const { localeInfo } = useGlobalData();
  const currentLanguage = localeInfo.language;
  const [toEs, setToEs] = useState(currentLanguage !== "en-US");

  const getNewRoute = (newLanguage) => {
    const newLocale = localeInfo.localized.find(
      (locale) => locale.language === newLanguage
    );
    const uri = newLocale?.uri;
    if (uri === CRAFT_HOMEPAGE_URI) return "/";
    return uri;
  };

  const handleChange = ({ target: { checked } }) => {
    setToEs(checked);
    const newLang = checked ? "es" : "en-US";
    const newRoute = getNewRoute(newLang);
    if (!newRoute) return null;
    router.push(newRoute);
  };

  return (
    <fieldset className="c-language-select">
      <legend className="a-hidden">{t("localize-content")}</legend>
      <div className="c-language-select__inner">
        <LangTag>Language</LangTag>
        <ToggleSwitch>
          <Input
            type="checkbox"
            name="langSelect"
            id="langSelect"
            onChange={handleChange}
          />
          <Label htmlFor="langSelect" on={toEs ? "true" : "false"}>
            <span className="inner" />
            <span
              className={classNames({
                switch: true,
                es: toEs,
              })}
            />
          </Label>
        </ToggleSwitch>
      </div>
    </fieldset>
  );
}

const LangTag = styled.span`
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-right: 8px;
  ${respond(`font-size: 12px;`)}
`;

const ToggleSwitch = styled.div`
  position: relative;
  background-color: var(--turquoise85);
  border-radius: 25px;
  width: 60px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid var(--turquoise85);
  border-radius: 20px;
  margin: 0;
  font-size: 13px;
  font-weight: bold;

  .inner {
    display: block;
    width: 200%;
    margin-left: ${(p) => (p.on === "true" ? "0" : "-100%")};
    transition: margin 0.3s ease-in 0s;
    &:before,
    &:after {
      display: block;
      float: left;
      width: 50%;
      height: 30px;
      padding: 0;
      line-height: 30px;
      color: white;
      font-weight: normal;
      box-sizing: border-box;
    }
    &:before {
      content: "En";
      padding-left: 10px;
      background-color: var(--turquoise85);
      color: var(--turquoise90);
    }
    &:after {
      content: "Es";
      padding-right: 10px;
      background-color: var(--turquoise85);
      color: var(--turquoise90);
      text-align: right;
    }
  }
  .switch {
    display: block;
    width: 24px;
    height: 23px;
    margin: 5px;
    background: var(--turquoise90);
    position: absolute;
    top: -1px;
    bottom: 0;
    right: ${(p) => (p.on === "true" ? "0" : "27px")};
    border: 0 solid var(--turquoise85);
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
    &:after {
      position: absolute;
      display: block;
      content: "En";
      width: 24px;
      height: 24px;
      left: 3px;
      color: var(--white);
    }
    &.es:after {
      content: "Es";
      left: 6px;
    }
  }
`;

LanguageSelect.displayName = "Global.LanguageSelect";
