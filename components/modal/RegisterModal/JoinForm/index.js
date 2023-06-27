import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Link as BaseLink } from "@rubin-epo/epo-react-lib";
import { SSOButton } from "@/components/atomic";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuthenticationContext } from "@/contexts/Authentication";
import AuthModal from "../../AuthModal";
import * as Styled from "./styles";

export default function JoinForm({ onEmailSignup }) {
  const { t } = useTranslation();
  const { getModalUrl } = useAuthModal();
  const {
    pendingGroup,
    setPendingGroup,
    goToGoogleSignIn,
    goToFacebookSignIn,
  } = useAuthenticationContext();

  return (
    <>
      {/* <Styled.JoinAsButtons>
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
      </Styled.JoinAsButtons> */}
      <div id="signUpDescription">
        <AuthModal.Title>
          {t("join.header", { context: pendingGroup })}
        </AuthModal.Title>
        {/* <AuthModal.Description>
          {t("join.description", { context: pendingGroup })}
        </AuthModal.Description> */}
      </div>
      <Styled.SSOButtons>
        <SSOButton service="google" type="button" onClick={goToGoogleSignIn}>
          {t("join.continue_with_google")}
        </SSOButton>
        <SSOButton
          service="facebook"
          type="button"
          onClick={goToFacebookSignIn}
        >
          {t("join.continue_with_facebook")}
        </SSOButton>
        <SSOButton service="email" type="button" onClick={onEmailSignup}>
          {t("join.sign_up_with_email")}
        </SSOButton>
      </Styled.SSOButtons>
      <Link
        legacyBehavior
        prefetch={false}
        href={getModalUrl("signIn")}
        shallow
        passHref
      >
        <BaseLink>{t("join.sign_in_link")}</BaseLink>
      </Link>
    </>
  );
}

JoinForm.propTypes = {
  onEmailSignup: PropTypes.func,
};
