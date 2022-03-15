import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Link as BaseLink, Button, SSOButton } from "@/components/atomic";
import { Input, FormField, Error, Password } from "@/components/form";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SignInModal() {
  const { query } = useRouter();

  const { t } = useTranslation();

  const { closeModal, getModalUrl } = useAuthModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  const {
    isAuthenticated,
    user,
    signIn,
    goToFacebookSignIn,
    goToGoogleSignIn,
  } = useAuthenticationContext();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) return;

    const response = await signIn(data);

    if (response.errors) {
      const invalid = response.errors.find(
        (e) => e.extensions.code === "INVALID"
      );

      if (invalid) {
        setError("email", { type: "manual", message: invalid.message });
      } else {
        setError("form", {
          type: "manual",
          message: response.errors.map((e) => e.message).join(" "),
        });
      }
    } else {
      closeModal();
    }

    // Return response for react-hook-from submit state
    return response;
  };

  const onClose = () => {
    closeModal();
  };

  return (
    <AuthModal
      open={!!query.signIn}
      onClose={onClose}
      aria-label={t("sign_in.header")}
    >
      {isAuthenticated ? ( // included only in case a user inadvertantly reopens the modal
        <>
          <AuthModal.Title>{t("sign_in.success")}</AuthModal.Title>
          <AuthModal.Description>
            {t("sign_in.success_message", { username: user?.email })}
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      ) : (
        <>
          <AuthModal.Title>{t("sign_in.header")}</AuthModal.Title>
          <Styled.SSOButtons>
            <SSOButton service="google" onClick={goToGoogleSignIn}>
              {t("sign_in.continue_with_google")}
            </SSOButton>
            <SSOButton service="facebook" onClick={goToFacebookSignIn}>
              {t("sign_in.continue_with_facebook")}
            </SSOButton>
          </Styled.SSOButtons>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            {errors?.form?.message && <Error>{errors.form.message}</Error>}
            <FormField
              htmlFor="signInEmail"
              label="form.email"
              error={errors?.email?.message}
            >
              <Input
                id="signInEmail"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
              />
            </FormField>
            <FormField htmlFor="signInPassword" label="form.password">
              <Password
                id="signInPassword"
                required
                autoComplete="current-password"
                {...register("password")}
              />
            </FormField>
            <Styled.AccountLinks>
              <Link href={getModalUrl("forgotPassword")} shallow passHref>
                <BaseLink>{t("sign_in.forgot_password_link")}</BaseLink>
              </Link>
              <Link href={getModalUrl("register")} shallow passHref>
                <BaseLink>{t("sign_in.create_account_link")}</BaseLink>
              </Link>
            </Styled.AccountLinks>
            <Styled.FormButtons>
              <Button
                type="submit"
                isInactive={!isDirty}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("sign_in.submit_pending")
                  : t("sign_in.submit")}
              </Button>
            </Styled.FormButtons>
          </Styled.Form>
        </>
      )}
    </AuthModal>
  );
}
