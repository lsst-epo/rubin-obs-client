import { useEffect } from "react";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useAuthModal, useIsMounted } from "@/hooks";
import { useAuthenticationContext } from "@/contexts/Authentication";
import Container from "@/components/layout/Container";
import { Button, Buttonish } from "@/components/atomic";

function isAuthorized(typeHandle, user, status) {
  if (
    typeHandle === "educatorPages" ||
    typeHandle === "investigationLandingPage"
  )
    return user?.group === "educators";
  if (typeHandle === "userProfilePage") return !!user && status === "active";
  return true;
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
  const mounted = useIsMounted();

  // Check the user type against the page type
  const authorized = !pendingDeletion && isAuthorized(typeHandle, user, status);

  const context = getRestrictedContext(
    status,
    pendingDeletion,
    isAuthenticated
  );

  // redirect to homepage when a user is no longer authenticated (signs out)
  useEffect(() => {
    if (!mounted || isAuthenticated) return;

    router.push("/");
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

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
    "investigationLandingPage",
  ]),
  children: PropTypes.node,
};
