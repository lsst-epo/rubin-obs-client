import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Input, Link as BaseLink } from "@/components/atomic";
import Modal from "@/components/layout/Modal";
import * as Styled from "./styles";

export default function SignInModal() {
  const { query, push } = useRouter();

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const { signIn } = useAuthentication();

  const onSubmit = (data) => {
    if (!data.email || !data.password) return;

    signIn(data);
  };

  const onClose = () => {
    push({ query: {} }, undefined, true);
  };

  // TODO: Needs proper a11y roles and labels
  return (
    <Modal open={!!query.signIn} onClose={onClose}>
      <h2>{t("auth.sign_in_header")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Label htmlFor="signInEmail">
          {t("auth.email_or_username_label")} {t("auth.required_label")}
        </Styled.Label>
        <Input id="signInEmail" type="text" required {...register("email")} />
        <Styled.Label htmlFor="signInPassword">
          {t("auth.password_label")} {t("auth.required_label")}
        </Styled.Label>
        <Input
          id="signInPassword"
          type="password"
          required
          {...register("password")}
        />
        <Styled.AccountLinks>
          <Link href={{ query: { forgotPassword: true } }} replace passHref>
            <BaseLink>{t("auth.forgot_password_link")}</BaseLink>
          </Link>
          <Link href={{ query: { registerStudent: true } }} replace passHref>
            <BaseLink>{t("auth.create_account_link")}</BaseLink>
          </Link>
        </Styled.AccountLinks>
        <button className="c-buttonish">{t("auth.log_in")}</button>
      </form>
    </Modal>
  );
}

SignInModal.propTypes = {};
