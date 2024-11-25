"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useQueryParams from "@/lib/routing/useQueryParams";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button, Error } from "@rubin-epo/epo-react-lib";
import { PasswordField } from "@/components/form/index.js";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SetPasswordModal() {
  const { closeModal } = useAuthModal();
  const { queryParams } = useQueryParams();
  const isOpen = !!queryParams.get("set_password");
  const code = queryParams.get("code");
  const id = queryParams.get("id");

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
      open={isOpen} // eslint-disable-line camelcase
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
            <PasswordField {...register("password")} />
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
