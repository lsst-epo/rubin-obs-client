import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Input } from "@/components/atomic";
import Modal from "@/components/layout/Modal";
import * as Styled from "./styles";

export default function ForgotPasswordModal() {
  const { query, push } = useRouter();

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const { forgotPassword } = useAuthentication();

  const onSubmit = (data) => {
    if (!data.email) return;

    const message = forgotPassword(data);

    console.info("message", message);
  };

  const onClose = () => {
    push({ query: {} }, undefined, true);
  };

  // TODO: Needs proper a11y roles and labels
  return (
    <Modal open={!!query.forgotPassword} onClose={onClose}>
      <h2>{t("auth.reset_password_header")}</h2>
      <p>{t("auth.reset_instructions")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Label htmlFor="resetPasswordEmail">
          {t("auth.email_label")} {t("auth.required_label")}
        </Styled.Label>
        <Input
          id="resetPasswordEmail"
          type="text"
          required
          {...register("email")}
        />
        <button className="c-buttonish">
          {t("auth.reset_password_button")}
        </button>
      </form>
    </Modal>
  );
}

ForgotPasswordModal.propTypes = {};
