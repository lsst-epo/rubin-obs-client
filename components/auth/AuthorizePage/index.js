import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { useAuthModal } from "@/hooks";
import { useAuthenticationContext } from "@/contexts/Authentication";
import Container from "@/components/layout/Container";
import { Button, Buttonish } from "@/components/atomic";

function isAuthorized(typeHandle, user) {
  if (typeHandle === "educatorPages") return user?.group === "educators";
  if (typeHandle === "userProfilePage") return !!user;
  return true;
}

function getRestrictedContext(pending, pendingDeletion, isAuthenticated) {
  if (pendingDeletion) return "deletion_pending";
  if (pending) return "approval_pending";
  if (isAuthenticated) return "restricted";
  return "not_authorized";
}

export default function AuthorizePage({ children }) {
  const { t } = useTranslation();
  const { isAuthenticated, user, status, pendingDeletion, typeHandle } =
    useAuthenticationContext();
  const { openModal } = useAuthModal();

  // Check the user type against the page type
  const authorized = !pendingDeletion && isAuthorized(typeHandle, user);

  const pending = typeHandle === "educatorPages" && status === "pending";

  const context = getRestrictedContext(
    pending,
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
              <a href="mailto:webmaster@lsst.org" key="link">
                link
              </a>,
            ]}
          />
        </p>
        {isAuthenticated ? (
          <Buttonish url="./" text={t("restricted.button_confirm")} />
        ) : (
          <Button
            onClick={() => {
              openModal("signIn");
            }}
          >
            {t("auth.log_in")}
          </Button>
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
  ]),
  children: PropTypes.node,
};
