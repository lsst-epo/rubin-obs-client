import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Button } from "@/components/atomic";
import { Input, FormField } from "@/components/form";
import Modal from "@/components/modal/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import * as Styled from "./styles";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

export default function ForgotPasswordModal() {
  const { openModal, closeModal } = useAuthModal();

  const { query } = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [email, setEmail] = useState();

  const { forgotPassword } = useAuthentication();

  const onSubmit = async (data) => {
    if (!data.email) return;

    const message = await forgotPassword(data);

    if (message) {
      setEmail(data.email);
      return message;
    }
    // TODO: Handle graphql errors
  };

  const onClose = () => {
    closeModal();
  };

  const onCancel = () => {
    openModal("signIn");
  };

  // TODO: Needs proper a11y roles and labels
  // Check footer contact form for a11y messaging / alerts
  return (
    <Modal
      open={!!query.forgotPassword}
      onClose={onClose}
      maxWidth="550px"
      aria-live="polite"
      aria-label="Forgot Password"
    >
      {isSubmitSuccessful ? (
        <ResetPasswordSuccess email={email} onClose={onClose} />
      ) : (
        <>
          <h2>{t("auth.reset_password_header")}</h2>
          <p>{t("auth.reset_instructions")}</p>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="resetPasswordEmail" label="form.email" required>
              <Input
                id="resetPasswordEmail"
                type="email"
                required
                {...register("email", { required: true })}
              />
            </FormField>
            <Styled.FormButtons>
              <Button isInactive={!isDirty} disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : t("auth.reset_password_button")}
              </Button>
              <Button
                type="button"
                styleAs="warning"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {t("form.cancel")}
              </Button>
            </Styled.FormButtons>
          </Styled.Form>
        </>
      )}
    </Modal>
  );
}

ForgotPasswordModal.propTypes = {};
