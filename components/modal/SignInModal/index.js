import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Link as BaseLink, Button, SSOButton } from "@/components/atomic";
import { Input, FormField, FormButtons } from "@/components/form";
import Modal from "@/components/modal/Modal";
import * as Styled from "./styles";

export default function SignInModal() {
  const { query } = useRouter();

  const { closeModal } = useAuthModal();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm();

  const { signIn } = useAuthenticationContext();

  const onSubmit = (data) => {
    if (!data.email || !data.password) return;

    signIn(data);
  };

  const onClose = () => {
    closeModal();
  };

  // TODO: Needs proper a11y roles and labels
  return (
    <Modal
      open={!!query.signIn}
      onClose={onClose}
      maxWidth="550px"
      aria-label="Sign In"
    >
      <h2>{t("auth.sign_in_header")}</h2>
      <Styled.SSOButtons>
        <SSOButton icon="google">Continue with Google</SSOButton>
        <SSOButton icon="facebook">Continue with Facebook</SSOButton>
      </Styled.SSOButtons>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <FormField isBlock htmlFor="signInEmail" label="form.email">
          <Input id="signInEmail" type="text" required {...register("email")} />
        </FormField>
        <FormField isBlock htmlFor="signInPassword" label="form.password">
          <Input
            id="signInPassword"
            type="password"
            required
            {...register("password")}
          />
        </FormField>
        <Styled.AccountLinks>
          <Link href={{ query: { forgotPassword: true } }} shallow passHref>
            <BaseLink>{t("auth.forgot_password_link")}</BaseLink>
          </Link>
          <Link href={{ query: { register: true } }} shallow passHref>
            <BaseLink>{t("auth.create_account_link")}</BaseLink>
          </Link>
        </Styled.AccountLinks>
        <FormButtons>
          <Button isInactive={!isDirty} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : t("auth.log_in")}
          </Button>
        </FormButtons>
      </Styled.Form>
    </Modal>
  );
}

SignInModal.propTypes = {};
