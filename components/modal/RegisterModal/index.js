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

  const { isAuthenticated, loading, error, pendingRole, setPendingRole } =
    useAuthenticationContext();

  const { t } = useTranslation();

  const onClose = () => {
    closeModal();
  };

  const onCancel = () => {
    openModal("register");
  };

  const onEmailSignup = () => {
    openModal("register", { role: pendingRole });
  };

  return (
    <AuthModal
      open={!!query.register}
      onClose={onClose}
      aria-label="Sign Up"
      image={isAuthenticated || loading ? undefined : pendingRole}
    >
      {loading ? (
        <>
          <AuthModal.Title>Registering...</AuthModal.Title>
        </>
      ) : isAuthenticated ? (
        <>
          <AuthModal.Title>
            {t("register.success", { context: pendingRole })}
          </AuthModal.Title>
          <AuthModal.Description>
            <Trans
              i18nKey="register.success_message"
              values={{ context: pendingRole }}
              components={[<strong key="bold"></strong>]}
            />
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      ) : error ? (
        <>
          <AuthModal.Title>Error!</AuthModal.Title>
          <AuthModal.Description>
            There was an error signing you in with{" "}
            {query.scope ? "Google" : "Facebook"}.
          </AuthModal.Description>
        </>
      ) : query.role === "teacher" || query.role === "student" ? (
        <RegisterForm onCancel={onCancel} />
      ) : (
        <JoinForm
          onEmailSignup={onEmailSignup}
          onRoleChange={setPendingRole}
          role={pendingRole}
        />
      )}
    </AuthModal>
  );
}
