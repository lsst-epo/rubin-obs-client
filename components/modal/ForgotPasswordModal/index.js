import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Button } from "@/components/atomic";
import { Input, FormField } from "@/components/form";
import Modal from "@/components/modal/Modal";
import * as Styled from "./styles";

export default function ForgotPasswordModal() {
  const { query, push } = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const { forgotPassword } = useAuthentication();

  const onSubmit = async (data) => {
    if (!data.email) return;

    const message = await forgotPassword(data);

    console.info("message", message);
  };

  const onClose = () => {
    push({ query: {} }, undefined, { shallow: true });
  };

  const onCancel = () => {
    push({ query: { signIn: true } }, undefined, { shallow: true });
  };

  // TODO: Needs proper a11y roles and labels
  // Check footer contact form for a11y messaging / alerts
  return (
    <Modal open={!!query.forgotPassword} onClose={onClose} maxWidth="550px">
      <h2>{t("auth.reset_password_header")}</h2>
      <p>{t("auth.reset_instructions")}</p>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="resetPasswordEmail" label="form.email" required>
          <Input
            id="resetPasswordEmail"
            type="text"
            required
            {...register("email", { required: true })}
          />
        </FormField>
        <Styled.FormButtons>
          <Button isInactive={!isDirty}>
            {t("auth.reset_password_button")}
          </Button>
          <Button type="button" styleAs="warning" onClick={onCancel}>
            {t("form.cancel")}
          </Button>
        </Styled.FormButtons>
      </Styled.Form>
    </Modal>
  );
}

ForgotPasswordModal.propTypes = {};
