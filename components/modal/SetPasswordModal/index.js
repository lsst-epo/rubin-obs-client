import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import { Password, FormField, Error } from "@/components/form";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SetPasswordModal() {
  const { closeModal } = useAuthModal();

  const { query } = useRouter();
  const { set_password, code, id } = query; // eslint-disable-line camelcase

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: {
      errors,
      isDirty,
      submitCount,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm();

  const { setPassword } = useAuthenticationContext();

  // runs on a failed form submission
  useEffect(() => {
    if (isSubmitSuccessful || submitCount < 1) return;
    reset(null, { keepErrors: true, keepSubmitCount: true });
  }, [isSubmitSuccessful, submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // clear form errors when fields are modified after failed form submission
  useEffect(() => {
    if (submitCount >= 1 && isDirty) clearErrors();
  }, [isDirty]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data) => {
    const response = await setPassword({ ...data, code, id });

    if (response.errors) {
      setError("form", {
        type: "manual",
        message: response.errors.map((e) => e.message).join(" "),
      });
    }

    return response;
  };

  const onClose = () => {
    closeModal();
  };

  return (
    <AuthModal
      open={!!set_password} // eslint-disable-line camelcase
      onClose={onClose}
      aria-label={t("set_password.header")}
    >
      {isSubmitSuccessful ? (
        <>
          <AuthModal.Title>{t("set_password.success")}</AuthModal.Title>
          <AuthModal.Description>
            {t("set_password.success_message")}
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>
              {t("set_password.confirm_button")}
            </Button>
          </Styled.FormButtons>
        </>
      ) : (
        <>
          <AuthModal.Title>{t("set_password.header")}</AuthModal.Title>
          <Styled.Form
            onSubmit={handleSubmit(onSubmit)}
            aria-describedby="setPasswordFormError"
          >
            <FormField
              htmlFor="createPassword"
              label="form.create_password"
              description={t("form.create_password_instructions")}
            >
              <Password
                id="createPassword"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                autoComplete="new-password"
                required
                {...register("password")}
              />
            </FormField>
            <Styled.FormButtons>
              <Button isInactive={!isDirty} disabled={isSubmitting}>
                {isSubmitting ? t("form.submitting") : t("set_password.submit")}
              </Button>
            </Styled.FormButtons>
            <Error id="setPasswordFormError">
              {errors?.form?.message || ""}
            </Error>
          </Styled.Form>
        </>
      )}
    </AuthModal>
  );
}
