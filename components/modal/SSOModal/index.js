import { useTranslation, Trans } from "react-i18next";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import useQueryParams from "@/lib/routing/useQueryParams";
import { Button } from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";

export default function SSOModal() {
  const { queryParams } = useQueryParams();
  const isOpen = !!queryParams.get("sso");

  const { closeModal } = useAuthModal();

  const { isAuthenticated, user, status, error, loading } =
    useAuthenticationContext();

  const { t } = useTranslation();

  const onClose = () => {
    closeModal();
  };

  const service = queryParams.get("facebook") ? "facebook" : "google";

  return (
    <AuthModal
      open={isOpen}
      onClose={onClose}
      aria-label={t("sign_in.loading", {
        service,
      })}
    >
      {isAuthenticated && (
        <>
          <AuthModal.Title>
            {status === "pending" ? t("sso.success_pending") : t("sso.success")}
          </AuthModal.Title>
          <AuthModal.Description>
            {status === "pending" ? (
              <Trans
                i18nKey="sso.success_message_pending"
                components={[<strong key="bold"></strong>]}
              />
            ) : (
              t("sso.success_message", { username: user?.email })
            )}
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
