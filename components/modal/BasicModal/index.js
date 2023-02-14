import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

function BasicModal({ header, description, onClose }) {
  const { t } = useTranslation();

  return (
    <AuthModal open={true} onClose={onClose}>
      <AuthModal.Title>{header}</AuthModal.Title>
      <AuthModal.Description>{description}</AuthModal.Description>
      <Styled.FormButtons>
        <Button onClick={onClose}>{t("form.confirm")}</Button>
      </Styled.FormButtons>
    </AuthModal>
  );
}

BasicModal.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BasicModal;
