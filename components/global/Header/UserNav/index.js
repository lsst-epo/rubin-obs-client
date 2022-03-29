import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAuthModal,
  useKeyDownEvent,
  useFocusTrap,
  useOnClickOutside,
} from "@/hooks";
import IconComposer from "@/svg/IconComposer";
import { useAuthenticationContext } from "@/contexts/Authentication";
import * as Styled from "./styles";

function UserNav() {
  const { openModal } = useAuthModal();
  const { t } = useTranslation();
  const { isAuthenticated, signOut } = useAuthenticationContext();
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useFocusTrap(ref, active);
  useKeyDownEvent(handleKeyDown);
  useOnClickOutside(ref, () => {
    setActive(false);
  });

  function handleKeyDown({ key }) {
    if (!active || key !== "Escape") return;
    setActive(false);
  }

  function handleClick(e) {
    e.preventDefault();
    setActive(!active);
  }

  return (
    <Styled.Nav aria-label="User" ref={ref} className="c-nav-list--desktop">
      {isAuthenticated && (
        <Styled.DropdownWrapper>
          <Styled.UserButton
            aria-expanded={active}
            aria-haspopup="menu"
            aria-controls="userSubNav"
            onClick={handleClick}
          >
            <IconComposer icon="User" />
            <span className="a-hidden">{t("account.header")}</span>
          </Styled.UserButton>
          <Styled.SubnavList open={active} id="userSubNav">
            <Styled.SubnavItem>
              <Styled.SubnavLink as="a">
                <IconComposer icon="account" />
                {t("auth.account")}
              </Styled.SubnavLink>
            </Styled.SubnavItem>
            <Styled.SubnavItem>
              <Styled.SubnavLink as="button" type="button" onClick={signOut}>
                <IconComposer icon="logOut" />
                {t("auth.log_out")}
              </Styled.SubnavLink>
            </Styled.SubnavItem>
          </Styled.SubnavList>
        </Styled.DropdownWrapper>
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
