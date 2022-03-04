import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import { Input, FormField } from "@/components/form";
import AuthModal from "../AuthModal";
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

    const response = await forgotPassword(data);

    if (response) {
      setEmail(data.email);
    }

    return response;
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
      aria-label={t("reset_password.header")}
    >
      {isSubmitSuccessful ? (
        <>
          <AuthModal.Title>{t("reset_password.success")}</AuthModal.Title>
          <AuthModal.Description>
            <Trans
              i18nKey="reset_password.success_message"
              values={{
                email,
              }}
              components={[<strong key="bold"></strong>]}
            />
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>
              {t("reset_password.confirm_button")}
            </Button>
          </Styled.FormButtons>
        </>
      ) : (
        <>
          <AuthModal.Title>{t("reset_password.header")}</AuthModal.Title>
          <AuthModal.Description>
            {t("reset_password.instructions")}
          </AuthModal.Description>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="resetPasswordEmail" label="form.email" required>
              <Input
                id="resetPasswordEmail"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
              />
            </FormField>
            <Styled.FormButtons>
              <Button isInactive={!isDirty} disabled={isSubmitting}>
                {isSubmitting
                  ? t("form.submitting")
                  : t("reset_password.submit")}
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
