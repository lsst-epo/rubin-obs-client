import { useTransition } from "react";
import PropTypes from "prop-types";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { fallbackLng } from "@/lib/i18n/settings";

export default function LanguageSelect({ id }) {
  const router = useRouter();
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const isDefaultLocale = fallbackLng.includes(language);
  const path = usePathname().split("/");
  path.shift();

  if (!isDefaultLocale) {
    path.shift();
  }

  const newLocale = () => {
    return isDefaultLocale ? "es" : "en";
  };

  const newRoute = `/${newLocale()}/${path.join("/")}`;

  const handleClick = () => {
    startTransition(() => {
      changeLanguage(newLocale());
      router.push(newRoute, {
        scroll: false,
      });
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
