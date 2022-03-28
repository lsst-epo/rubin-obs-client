import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { useAuthModal } from "@/hooks";
import { useAuthenticationContext } from "@/contexts/Authentication";
import Container from "@/components/layout/Container";
import { Button, Buttonish } from "@/components/atomic";

export default function AuthorizePage({ typeHandle, children }) {
  const { t } = useTranslation();
  const { isAuthenticated, user, status, loading, error } =
    useAuthenticationContext();
  const { openModal } = useAuthModal();

  // Check the user type against the page type
  const authorized =
    typeHandle === "educatorPages" ? user?.group === "educators" : true;

  const pending = typeHandle === "educatorPages" && status === "pending";

  const context = pending
    ? "approval_pending"
    : isAuthenticated
    ? "restricted"
    : "not_authorized";

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
  typeHandle: PropTypes.oneOf(["pages", "educatorPages", "studentPages"]),
  children: PropTypes.node,
};
