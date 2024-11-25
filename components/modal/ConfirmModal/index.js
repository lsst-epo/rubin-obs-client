"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

function ConfirmModal({
  header,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <AuthModal open={true} onClose={onClose} darkMode>
      <AuthModal.Title>{header}</AuthModal.Title>
      <AuthModal.Description>{description}</AuthModal.Description>
      <Styled.FormButtons>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
        <Button type="button" styleAs="secondary" onClick={onClose}>
          {t("form.cancel")}
        </Button>
      </Styled.FormButtons>
    </AuthModal>
  );
}

ConfirmModal.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmModal;
