"use client";
import PropTypes from "prop-types";
import useClientTranslation from "@/lib/i18n/client";
import { fallbackLng } from "@/lib/i18n/settings";
import { I18nextProvider } from "react-i18next";

const I18NextClientProvider = ({ locale = fallbackLng, children }) => {
  const { i18n } = useClientTranslation(locale);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

I18NextClientProvider.displayName = "i18next.Provider";

I18NextClientProvider.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.node,
};

export default I18NextClientProvider;
