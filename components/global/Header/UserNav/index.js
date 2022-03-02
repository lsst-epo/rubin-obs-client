import { useTranslation } from "react-i18next";
import { useAuthModal } from "@/hooks";
import IconComposer from "@/svg/IconComposer";
import { useAuthenticationContext } from "@/contexts/Authentication";
import * as Styled from "./styles";

function UserNav() {
  const { openModal } = useAuthModal();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthenticationContext();

  return (
    <Styled.Nav aria-label="User">
      {isAuthenticated && (
        <Styled.UserToggle href="/account" passHref>
          <a>
            <IconComposer icon="User" />
            <span className="a-hidden">{t("auth.account")}</span>
          </a>
        </Styled.UserToggle>
      )}
      {!isAuthenticated && (
        <>
          <Styled.Toggle onClick={() => openModal("signIn")}>
            {t("auth.log_in")}
          </Styled.Toggle>
          <Styled.RegisterToggle onClick={() => openModal("register")}>
            {t("auth.sign_up")}
          </Styled.RegisterToggle>
        </>
      )}
    </Styled.Nav>
  );
}

UserNav.displayName = "Global.Header.UserNav";

export default UserNav;
