import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Input } from "@/components/atomic";
import Modal from "@/components/layout/Modal";
import * as Styled from "./styles";

export default function RegisterModal() {
  const { query, push } = useRouter();

  const registerRole = query.registerStudent ? "student" : "teacher";

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const { register: registerStudent } = useAuthentication();

  const onSubmit = (data) => {
    if (!data.email || !data.password) return;

    registerStudent({ ...data, role: registerRole });
  };

  const onClose = () => {
    push({ query: {} }, undefined, true);
  };

  if (!registerRole) return null;

  // TODO: Needs proper a11y roles and labels
  return (
    <Modal
      open={!!query.registerStudent || !!query.registerTeacher}
      onClose={onClose}
    >
      <h2>{t("auth.register_header", { context: registerRole })}</h2>
      <p>{t("auth.register_instructions", { context: registerRole })}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Label htmlFor="studentEmail">
          {t("auth.email_label")} {t("auth.required_label")}
        </Styled.Label>
        <Input id="studentEmail" type="email" required {...register("email")} />
        <Styled.Label htmlFor="studentName">
          {t("auth.name_label")} {t("auth.required_label")}
        </Styled.Label>
        <Input
          id="studentName"
          type="text"
          required
          {...register("fullName")}
        />
        <Styled.Label htmlFor="studentPassword">
          {t("auth.create_password_label")} {t("auth.required_label")}
        </Styled.Label>
        <p>{t("auth.create_password_instructions")}</p>
        <Input
          id="studentPassword"
          type="password"
          required
          {...register("password")}
        />
        <button className="c-buttonish">{t("auth.sign_up_button")}</button>
        <button type="button" onClick={onClose} className="c-buttonish">
          {t("auth.cancel_button")}
        </button>
      </form>
    </Modal>
  );
}

RegisterModal.propTypes = {
  registerRole: PropTypes.oneOf(["student", "teacher"]),
};
