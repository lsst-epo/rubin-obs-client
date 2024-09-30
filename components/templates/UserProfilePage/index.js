"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { useIsMounted } from "@/hooks";
import AuthorizePage from "@/components/auth/AuthorizePage";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { Button, Container, IconComposer } from "@rubin-epo/epo-react-lib";
import { BasicModal, ConfirmModal } from "@/components/modal";
import ProfilePreferencesForm from "./ProfilePreferencesForm";
import PasswordForm from "./PasswordForm";
import * as Styled from "./styles";

function UserProfilePageTemplate({
  data: { id, title, text, uri, typeHandle },
}) {
  const { t } = useTranslation();
  const {
    isAuthenticated,
    maybeRefreshToken,
    fetchUserData,
    requestAccountDeletion,
  } = useAuthenticationContext();
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useIsMounted();

  useEffect(() => {
    (async () => {
      const data = await fetchUserData();
      if (!isAuthenticated) return;
      if (data?.viewer) {
        setUserData(data.viewer);
        setError(null);
        setIsLoading(false);
      } else if (data?.error) {
        setError(data.errorType);
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onConfirmDelete() {
    setIsSubmittingDelete(true);

    const response = await requestAccountDeletion();

    if (!response.updateViewer) {
      setShowModal("error");
      setIsSubmittingDelete(false);
    } else {
      setShowModal("success");
      setIsSubmittingDelete(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AuthorizePage typeHandle={typeHandle}>
        <Container>
          <Styled.Header>
            <Styled.PageTitle>
              <IconComposer icon="userInverted" />
              <span>{title}</span>
            </Styled.PageTitle>
            {userData && (
              <Button
                onClick={() => setShowModal("confirm")}
                styleAs="tertiary"
              >
                {t("account.delete")}
              </Button>
            )}
          </Styled.Header>
          <div aria-live="polite" aria-atomic={false} aria-busy={isLoading}>
            {isLoading && (
              <Styled.Section>
                <header>
                  <Styled.Status>{t("account.loading")}</Styled.Status>
                </header>
              </Styled.Section>
            )}
            {error && (
              <Styled.Section>
                <header>
                  <Styled.Status>
                    {t("account.error", { context: error })}
                  </Styled.Status>
                </header>
              </Styled.Section>
            )}
            {userData && (
              <>
                <ProfilePreferencesForm
                  userData={userData}
                  maybeRefreshToken={maybeRefreshToken}
                  onSuccess={setUserData}
                />
                <PasswordForm
                  userData={userData}
                  maybeRefreshToken={maybeRefreshToken}
                />
              </>
            )}
          </div>
        </Container>
      </AuthorizePage>
      {showModal === "confirm" && (
        <ConfirmModal
          header={t("account.delete_confirm_header")}
          description={
            <Trans
              i18nKey="account.delete_confirm_description"
              components={[<strong key="bold"></strong>]}
            />
          }
          confirmLabel={
            isSubmittingDelete
              ? t("account.delete_pending")
              : t("account.delete_confirm_label")
          }
          onConfirm={onConfirmDelete}
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal === "success" && (
        <BasicModal
          header={t("account.delete_success_header")}
          description={t("account.delete_success_description")}
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal === "error" && (
        <BasicModal
          header={t("account.delete_error_header")}
          description={t("account.error", { context: "delete_failed" })}
          onClose={() => setShowModal(null)}
        />
      )}
    </>
  );
}

UserProfilePageTemplate.displayName = "Template.UserProfilePage";

UserProfilePageTemplate.propTypes = {
  data: PropTypes.object,
};

export default UserProfilePageTemplate;
