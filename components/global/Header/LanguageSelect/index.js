import { useTransition } from "react";
import PropTypes from "prop-types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { fallbackLng, languages } from "@/lib/i18n/settings";

/** stand-in for useParams() in app router */
const getParams = (pathname) => {
  const uriSegments = pathname.split("/").filter((segment) => segment !== "");

  if (uriSegments.length === 0) {
    return { locale: fallbackLng, uriSegments: [] };
  }

  if (languages.includes(uriSegments[0])) {
    const locale = uriSegments.shift();
    return { locale, uriSegments };
  } else {
    return { locale: fallbackLng, uriSegments: [...uriSegments] };
  }
};

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
  const router = useRouter();
  const pathname = usePathname();
  const { locale, uriSegments } = getParams(pathname);
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const isDefaultLocale = fallbackLng.includes(locale);

  const newLocale = () => {
    return isDefaultLocale ? "es" : "en";
  };

  const newRoute = `/${newLocale()}/${uriSegments.join(
    "/"
  )}${filterSearchParams(searchParams)}`;

  const handleClick = () => {
    startTransition(() => {
      i18n.changeLanguage(newLocale());
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
