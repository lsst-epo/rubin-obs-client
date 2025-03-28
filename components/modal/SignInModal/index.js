"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useQueryParams from "@/lib/routing/useQueryParams";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { GoogleSSOButton } from "@/components/atomic";
import {
  Link as BaseLink,
  Button,
  Input,
  FormField,
  Error,
  Password,
} from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SignInModal() {
  const { queryParams } = useQueryParams();
  const isOpen = !!queryParams.get("signIn");

  const { t } = useTranslation();

  const { closeModal, getModalUrl } = useAuthModal();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const {
    isAuthenticated,
    status,
    user,
    pendingGroup,
    setPendingGroup,
    signIn,
    goToFacebookSignIn,
    goToGoogleSignIn,
  } = useAuthenticationContext();

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

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
    <AuthModal open={isOpen} onClose={onClose} aria-label={t("sign_in.header")}>
      {isAuthenticated && status === "active" ? ( // included only in case a user inadvertantly reopens the modal
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
          {/* <AuthModal.Description>
            {t("sign_in.sso_description")}
          </AuthModal.Description> */}
          {/* <Styled.SignInAsButtons>
            <Button
              styleAs={pendingGroup === "students" ? "primary" : "tertiary"}
              onClick={() => setPendingGroup("students")}
              aria-controls="signUpDescription"
              aria-selected={pendingGroup === "students"}
            >
              {t("join.as", { context: "students" })}
            </Button>
            <Button
              styleAs={pendingGroup === "educators" ? "educator" : "tertiary"}
              onClick={() => setPendingGroup("educators")}
              aria-controls="signUpDescription"
              aria-selected={pendingGroup === "educators"}
            >
              {t("join.as", { context: "educators" })}
            </Button>
          </Styled.SignInAsButtons> */}
          <Styled.SSOButtons>
            <GoogleSSOButton service="google" type="button">
              {t("join.continue_with_google")}
            </GoogleSSOButton>
            {/* <SSOButton service="facebook" onClick={goToFacebookSignIn}>
              {t("sign_in.continue_with_facebook")}
            </SSOButton> */}
          </Styled.SSOButtons>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <AuthModal.Description>
              {t("sign_in.email_sign_in_description")}
            </AuthModal.Description>
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
              <Link
                legacyBehavior
                prefetch={false}
                href={getModalUrl("forgotPassword")}
                shallow
                passHref
              >
                <BaseLink>{t("sign_in.forgot_password_link")}</BaseLink>
              </Link>
              <Link
                legacyBehavior
                prefetch={false}
                href={getModalUrl("register")}
                shallow
                passHref
              >
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
