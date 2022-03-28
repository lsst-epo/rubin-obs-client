import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Body from "@/global/Body";
import Container from "@/components/layout/Container";
import IconComposer from "@/components/svg/IconComposer";
import AuthorizePage from "@/components/auth/AuthorizePage";
import { Button } from "@/components/atomic";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { fetchUser, suspendUser } from "@/lib/api/auth";
import ProfilePreferencesForm from "./ProfilePreferencesForm";
import PasswordForm from "./PasswordForm";
import * as Styled from "./styles";

function UserProfilePageTemplate({
  data: { id, title, text, uri, typeHandle },
}) {
  const { t } = useTranslation();
  const { maybeRefreshToken } = useAuthenticationContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const isLoading = !userData && !error;

  useEffect(() => {
    (async () => {
      const data = await fetchUser(maybeRefreshToken);
      if (data?.viewer) {
        setUserData(data.viewer);
      } else if (data?.error) {
        setError(data.errorType);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function onDeleteClick() {
    const response = await suspendUser(maybeRefreshToken);
    console.info(response);
  }

  return (
    <Body title={title}>
      <AuthorizePage typeHandle={typeHandle}>
        <Container>
          <Styled.Header>
            <Styled.PageTitle>
              <IconComposer icon="userInverted" />
              <span>{title}</span>
            </Styled.PageTitle>
            <Button onClick={onDeleteClick} styleAs="tertiary">
              {t("account.delete")}
            </Button>
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
    </Body>
  );
}

UserProfilePageTemplate.displayName = "Template.UserProfilePage";

UserProfilePageTemplate.propTypes = {
  data: PropTypes.object,
};

export default UserProfilePageTemplate;
