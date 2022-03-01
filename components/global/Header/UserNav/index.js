import { useTranslation } from "react-i18next";
import { useAuthentication, useAuthModal } from "@/hooks";
import * as Styled from "./styles";

function UserNav() {
  const { isAuthenticated } = useAuthentication();
  const { openModal } = useAuthModal();
  const { t } = useTranslation();

  return (
    <Styled.Nav aria-label="User">
      <Styled.Toggle onClick={() => openModal("signIn")}>
        {t("auth.log_in")}
      </Styled.Toggle>
      <Styled.RegisterToggle onClick={() => openModal("register")}>
        {t("auth.sign_up")}
      </Styled.RegisterToggle>
    </Styled.Nav>
  );
}

UserNav.displayName = "Global.Header.UserNav";

export default UserNav;
