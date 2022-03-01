import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// import useAuthentication from "@/hooks/useAuthentication";
import { Button, Link as BaseLink, SSOButton } from "@/components/atomic";
import * as Styled from "./styles";
import Link from "next/link";

export default function RegisterRoleForm({
  role,
  onRoleChange,
  onEmailSignup,
}) {
  const { t } = useTranslation();

  // TODO: Needs proper a11y roles and labels
  // Make sure modal is announced when user moves between sign in / forgot password / etc.
  return (
    <>
      <Styled.RoleFormButtons>
        <Button
          styleAs={role === "student" ? "primary" : "tertiary"}
          onClick={() => onRoleChange("student")}
          aria-controls="signUpDescription"
          aria-selected={role === "student"}
        >
          {t("auth.sign_up_as", { context: "student" })}
        </Button>
        <Button
          styleAs={role === "teacher" ? "primary" : "tertiary"}
          onClick={() => onRoleChange("teacher")}
          aria-controls="signUpDescription"
          aria-selected={role === "teacher"}
        >
          {t("auth.sign_up_as", { context: "teacher" })}
        </Button>
      </Styled.RoleFormButtons>
      <div id="signUpDescription">
        <h2>{t("auth.sign_up", { context: role })}</h2>
        <p>{t("auth.join", { context: role })}</p>
      </div>
      <Styled.SSOButtons>
        <SSOButton icon="google" type="button">
          Continue with Google
        </SSOButton>
        <SSOButton icon="facebook" type="button">
          Continue with Facebook
        </SSOButton>
        <SSOButton icon="email" type="button" onClick={onEmailSignup}>
          Sign up with email
        </SSOButton>
      </Styled.SSOButtons>
      <Link href={{ query: { signIn: true } }} shallow passHref>
        <BaseLink>Already have an account?</BaseLink>
      </Link>
    </>
  );
}

RegisterRoleForm.propTypes = {
  role: PropTypes.oneOf(["student", "teacher"]),
};
