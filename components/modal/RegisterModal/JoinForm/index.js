import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button, Link as BaseLink, SSOButton } from "@/components/atomic";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuthenticationContext } from "@/contexts/Authentication";
import AuthModal from "../../AuthModal";
import * as Styled from "./styles";

export default function JoinForm({ onEmailSignup, onRoleChange, role }) {
  const { t } = useTranslation();

  const { getModalUrl } = useAuthModal();

  const { getFacebookAuthUrl, getGoogleAuthUrl } = useAuthenticationContext();

  /** WIP: google auth */
  const onGoogleSignIn = () => {
    const googleOauthUrl = getGoogleAuthUrl({ role });
    console.info("googleOauthUrl", googleOauthUrl);

    window.open(googleOauthUrl, "_blank");
  };

  /** WIP: facebook auth */
  const onFacebookSignIn = async () => {
    const data = await getFacebookAuthUrl();

    console.info("onFacebookSignIn", data);

    if (data?.facebookOauthUrl) {
      window.open(data.facebookOauthUrl, "_blank");
    }
  };

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
          styleAs={role === "teacher" ? "teacher" : "tertiary"}
          onClick={() => onRoleChange("teacher")}
          aria-controls="signUpDescription"
          aria-selected={role === "teacher"}
        >
          {t("join.as", { context: "teacher" })}
        </Button>
      </Styled.JoinAsButtons>
      <div id="signUpDescription">
        <AuthModal.Title>{t("join.header", { context: role })}</AuthModal.Title>
        <AuthModal.Description>
          {t("join.description", { context: role })}
        </AuthModal.Description>
      </div>
      <Styled.SSOButtons>
        <SSOButton icon="google" type="button" onClick={onGoogleSignIn}>
          {t("join.continue_with_google")}
        </SSOButton>
        <SSOButton icon="facebook" type="button" onClick={onFacebookSignIn}>
          {t("join.continue_with_facebook")}
        </SSOButton>
        <SSOButton icon="email" type="button" onClick={onEmailSignup}>
          {t("join.sign_up_with_email")}
        </SSOButton>
      </Styled.SSOButtons>
      <Link href={getModalUrl("signIn")} shallow passHref>
        <BaseLink>{t("join.sign_in_link")}</BaseLink>
      </Link>
    </>
  );
}
