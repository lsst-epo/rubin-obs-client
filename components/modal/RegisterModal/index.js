import { useRouter } from "next/router";
import { useTranslation, Trans } from "react-i18next";
import { useAuthenticationContext } from "@/contexts/Authentication";
import RegisterForm from "./RegisterForm";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import AuthModal from "../AuthModal";
import JoinForm from "./JoinForm";
import * as Styled from "./RegisterForm/styles";

export default function RegisterModal() {
  const { query } = useRouter();

  const { openModal, closeModal } = useAuthModal();

  const { isAuthenticated, pendingGroup, user } = useAuthenticationContext();

  const { t } = useTranslation();

  const onClose = () => {
    closeModal();
  };

  const onCancel = () => {
    openModal("register");
  };

  const onEmailSignup = () => {
    openModal("register", { group: pendingGroup });
  };

  return (
    <AuthModal
      open={!!query.register}
      onClose={onClose}
      aria-label={t("register.header")}
      image={isAuthenticated ? undefined : pendingGroup}
    >
      {isAuthenticated ? (
        <>
          <AuthModal.Title>
            {t("register.success", { context: user?.group || pendingGroup })}
          </AuthModal.Title>
          <AuthModal.Description>
            <Trans
              i18nKey="register.success_message"
              values={{ context: user?.group || pendingGroup }}
              components={[<strong key="bold"></strong>]}
            />
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      ) : query.group === "teachers" || query.group === "students" ? (
        <RegisterForm onCancel={onCancel} />
      ) : (
        <JoinForm onEmailSignup={onEmailSignup} />
      )}
    </AuthModal>
  );
}
