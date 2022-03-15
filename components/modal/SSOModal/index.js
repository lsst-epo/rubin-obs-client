import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SSOModal() {
  const { query } = useRouter();

  const { closeModal } = useAuthModal();

  const { isAuthenticated, user, error, loading } = useAuthenticationContext();

  const { t } = useTranslation();

  const onClose = () => {
    closeModal();
  };

  const service = query.facebook ? "facebook" : "google";

  return (
    <AuthModal
      open={!!query.sso}
      onClose={onClose}
      aria-label={t("sign_in.loading", {
        service,
      })}
    >
      {isAuthenticated && ( // included only in case a user inadvertently reopens the modal
        <>
          <AuthModal.Title>{t("sign_in.success")}</AuthModal.Title>
          <AuthModal.Description>
            {t("sign_in.success_message", { username: user?.email })}
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      )}
      {loading && (
        <AuthModal.Title>
          {t("sign_in.loading", { context: service })}
        </AuthModal.Title>
      )}
      {error && (
        <>
          <AuthModal.Title>{t("sign_in.error")}</AuthModal.Title>
          <AuthModal.Description>
            {t("sign_in.error_message", { context: service })}
          </AuthModal.Description>
        </>
      )}
    </AuthModal>
  );
}
