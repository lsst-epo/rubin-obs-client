"use client";
import PropTypes from "prop-types";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

function TranslationPending({ className, children }) {
  const { t } = useTranslation();

  return (
    <Styled.EarlyAccess className={className} color="#f80">
      {/* <div>{t("investigation.early_access.line_1_text")}</div> */}
      {/* <div>{t("investigation.early_access.line_2_text")}</div> */}
      <div>{"Traducción"}</div>
      <div>{"Pendiente"}</div>
    </Styled.EarlyAccess>
  );
}

TranslationPending.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TranslationPending;
