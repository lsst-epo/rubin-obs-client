import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import { Input, FormField } from "@/components/form";
import AuthModal from "../AuthModal";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import * as Styled from "./styles";

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

  const { forgotPassword } = useAuthenticationContext();

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

  return (
    <AuthModal
      open={!!query.forgotPassword}
      onClose={onClose}
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
                {...register("email")}
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
    </AuthModal>
  );
}

ForgotPasswordModal.propTypes = {};
