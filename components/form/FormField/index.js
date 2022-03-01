import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function FormField({
  htmlFor,
  label,
  required,
  children,
  error,
  description,
}) {
  const { t } = useTranslation();

  return (
    <Styled.Group>
      <Styled.Label htmlFor={htmlFor}>
        {t(label, { context: required ? "required" : "" })}
      </Styled.Label>
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.InputWrapper>{children}</Styled.InputWrapper>
      {error && (
        <Styled.Error>
          <span className="a-hidden">{t("form.error_label")}</span>
          {error}
        </Styled.Error>
      )}
    </Styled.Group>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.string,
};
