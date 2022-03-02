import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button, Link as BaseLink, SSOButton } from "@/components/atomic";
import * as Styled from "./styles";

export default function JoinForm({ onEmailSignup, onRoleChange, role }) {
  const { t } = useTranslation();

  return (
    <>
      <Styled.JoinAsButtons>
        <Button
          styleAs={role === "student" ? "primary" : "tertiary"}
          onClick={() => onRoleChange("student")}
          aria-controls="signUpDescription"
          aria-selected={role === "student"}
        >
          {t("join.as", { context: "student" })}
        </Button>
        <Button
          styleAs={role === "teacher" ? "primary" : "tertiary"}
          onClick={() => onRoleChange("teacher")}
          aria-controls="signUpDescription"
          aria-selected={role === "teacher"}
        >
          {t("join.as", { context: "teacher" })}
        </Button>
      </Styled.JoinAsButtons>
      <div id="signUpDescription">
        <h2>{t("join.header", { context: role })}</h2>
        <p>{t("join.description", { context: role })}</p>
      </div>
      <Styled.SSOButtons>
        <SSOButton icon="google" type="button">
          {t("join.continue_with_google")}
        </SSOButton>
        <SSOButton icon="facebook" type="button">
          {t("join.continue_with_facebook")}
        </SSOButton>
        <SSOButton icon="email" type="button" onClick={onEmailSignup}>
          {t("join.sign_up_with_email")}
        </SSOButton>
      </Styled.SSOButtons>
      <Link href={{ query: { signIn: true } }} shallow passHref>
        <BaseLink>{t("join.sign_in_link")}</BaseLink>
      </Link>
    </>
  );
}
