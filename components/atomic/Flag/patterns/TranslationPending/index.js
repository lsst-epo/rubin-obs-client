"use client";
import PropTypes from "prop-types";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

function TranslationPending({ className, children }) {
  const { t } = useTranslation();

  return (
    <Styled.EarlyAccess className={className} color="#f80">
      <div>{t("locale-fallback.flag.translation")}</div>
      <div>{t("locale-fallback.flag.pending")}</div>
    </Styled.EarlyAccess>
  );
}

TranslationPending.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TranslationPending;
