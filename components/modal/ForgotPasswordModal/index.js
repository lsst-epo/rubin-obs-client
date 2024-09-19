import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button, FormField, Input } from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";
import useQueryParams from "@/lib/routing/useQueryParams";

export default function ForgotPasswordModal() {
  const { openModal, closeModal } = useAuthModal();

  const { queryParams } = useQueryParams();
  const isOpen = !!queryParams.get("forgotPassword");

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [email, setEmail] = useState();

  const { forgotPassword } = useAuthenticationContext();

  const onSubmit = async (data) => {
    if (!data.email) return;

    const response = await forgotPassword(data);

    if (response.errors) {
      const invalid = response.errors.find(
        (e) => e.extensions.code === "INVALID"
      );

      if (invalid) {
        setError("email", { type: "manual", message: invalid.message });
      } else {
        setError("form", {
          type: "manual",
          message: response.errors.map((e) => e.message),
        });
      }
    } else {
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
      open={isOpen}
      onClose={onClose}
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
                styleAs="secondary"
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
