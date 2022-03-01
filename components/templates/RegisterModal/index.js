import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Button, Link as BaseLink, SSOButton } from "@/components/atomic";
import Modal from "@/components/layout/Modal";
import * as Styled from "./styles";
import Link from "next/link";

export default function RegisterModal() {
  const { query, push } = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const { register: registerApi } = useAuthentication();

  const [role, setRole] = useState("student");

  const onSubmit = (data) => {
    if (!data.email || !data.password) return;

    registerApi({ ...data, role: "student" });
  };

  const onClose = () => {
    push({ query: {} }, undefined, { shallow: true });
  };

  // TODO: Needs proper a11y roles and labels
  // Make sure modal is announced when user moves between sign in / forgot password / etc.
  return (
    <Modal
      open={!!query.register}
      onClose={onClose}
      image={{
        src: `/images/sign_up_student.png`,
        width: 231.21,
        height: 247.22,
      }}
    >
      <Styled.RoleFormButtons>
        <Button
          styleAs={role === "student" ? "primary" : "tertiary"}
          onClick={() => setRole("student")}
          aria-controls="signUpDescription"
          aria-selected={role === "student"}
        >
          {t("auth.sign_up_as", { context: "student" })}
        </Button>
        <Button
          styleAs={role === "teacher" ? "primary" : "tertiary"}
          onClick={() => setRole("teacher")}
          aria-controls="signUpDescription"
          aria-selected={role === "teacher"}
        >
          {t("auth.sign_up_as", { context: "teacher" })}
        </Button>
      </Styled.RoleFormButtons>
      <div aria-live="polite" id="signUpDescription">
        <h2>{t("auth.sign_up", { context: role })}</h2>
        <p>{t("auth.join", { context: role })}</p>
      </div>
      <Styled.SSOButtons>
        <SSOButton icon="google">Continue with Google</SSOButton>
        <SSOButton icon="facebook">Continue with Facebook</SSOButton>
        <SSOButton icon="email">Sign up with email</SSOButton>
      </Styled.SSOButtons>
      <Link href={{ query: { signIn: true } }} shallow passHref>
        <BaseLink>Already have an account?</BaseLink>
      </Link>
      {/*
        <>
          <h2>{t("auth.register_header", { context: role })}</h2>
          <p>{t("auth.register_instructions", { context: "student" })}</p>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="studentEmail" label="form.email" required>
              <Input
                id="studentEmail"
                type="email"
                required
                {...register("email")}
              />
            </FormField>
            <FormField htmlFor="studentName" label="form.name" required>
              <Input
                id="studentName"
                type="text"
                required
                {...register("fullName")}
              />
            </FormField>
            <FormField
              htmlFor="studentPassword"
              label="form.create_password"
              description={t("form.create_password_instructions")}
            >
              <Input
                id="studentPassword"
                type="password"
                required
                {...register("password")}
              />
            </FormField>
            <Styled.FormButtons>
              <Button isInactive={!isDirty}>{t("form.sign_up")}</Button>
              <Button type="button" onClick={onClose} styleAs="warning">
                {t("form.cancel")}
              </Button>
            </Styled.FormButtons>
          </Styled.Form>
        </>
        */}
    </Modal>
  );
}
