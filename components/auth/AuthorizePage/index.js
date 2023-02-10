import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useAuthModal } from "@/hooks";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { Container } from "@rubin-epo/epo-react-lib";
import { Button, Buttonish } from "@/components/atomic";
import * as Styled from "./styles";

const AUTHORIZED_TYPES = {
  pages: false,
  educatorPages: true,
  studentPages: false,
  userProfilePage: true,
  investigationLandingPage: false,
};

function isAuthorized(typeHandle, user, status) {
  if (typeHandle === "educatorPages") return user?.group === "educators";
  if (typeHandle === "userProfilePage") return !!user && status === "active";
  return false;
}

function getRestrictedContext(status, pendingDeletion, isAuthenticated) {
  if (pendingDeletion) return "deletion_pending";
  if (status === "pending") return "approval_pending";
  if (isAuthenticated) return "restricted";
  return "not_authorized";
}

export default function AuthorizePage({ typeHandle, children }) {
  const { t } = useTranslation();
  const { isAuthenticated, user, status, pendingDeletion } =
    useAuthenticationContext();
  const { openModal } = useAuthModal();
  const router = useRouter();
  const isAuthorizedType = AUTHORIZED_TYPES[typeHandle];

  if (!isAuthorizedType) return <>{children}</>;

  // Check the user type against the page type
  const authorized = !pendingDeletion && isAuthorized(typeHandle, user, status);

  const context = getRestrictedContext(
    status,
    pendingDeletion,
    isAuthenticated
  );

  // Show child content if authorized
  return authorized ? (
    <>{children}</>
  ) : (
    // else, show restricted message
    <Container bgColor="white" className="c-page-header" width="narrow">
      <div className="c-content-rte">
        <h2>{t("restricted.header", { context })}</h2>
        <p>
          <Trans
            i18nKey="restricted.message"
            values={{ context }}
            components={[
              <a href="mailto:epo-feedback@lsst.org" key="link">
                link
              </a>,
            ]}
          />
        </p>
        {isAuthenticated ? (
          <Buttonish url="./" text={t("restricted.button_confirm")} />
        ) : (
          <Styled.AuthButtons>
            <Button
              onClick={() => {
                openModal("signIn");
              }}
            >
              {t("auth.log_in")}
            </Button>
            <Button
              styleAs="educator"
              onClick={() => {
                openModal("register");
              }}
            >
              {t("auth.sign_up")}
            </Button>
          </Styled.AuthButtons>
        )}
      </div>
    </Container>
  );
}

AuthorizePage.propTypes = {
  typeHandle: PropTypes.oneOf([
    "pages",
    "educatorPages",
    "studentPages",
    "userProfilePage",
    "investigationLandingPage",
  ]),
  children: PropTypes.node,
};
