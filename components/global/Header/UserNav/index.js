import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Popover, Portal } from "@headlessui/react";
import { useAuthModal, useBoundingBox } from "@/hooks";
import IconComposer from "@/svg/IconComposer";
import { useAuthenticationContext } from "@/contexts/Authentication";
import * as Styled from "./styles";

function UserNav({ headerVisible, userProfilePage }) {
  const { openModal } = useAuthModal();
  const { t } = useTranslation();
  const { isAuthenticated, status, signOut } = useAuthenticationContext();
  const [box, ref] = useBoundingBox();

  const showUserMenu = isAuthenticated && status === "active";

  return (
    <Styled.Nav aria-label="User" className="c-nav-list--desktop" ref={ref}>
      {
        showUserMenu ? (
          <Popover>
            {({ open }) => (
              <Styled.DropdownWrapper>
                <Popover.Button as={Styled.UserButton}>
                  <IconComposer icon="User" />
                  <span className="a-hidden">{t("account.header")}</span>
                </Popover.Button>
                <Portal>
                  <Popover.Panel
                    as={Styled.SubnavList}
                    open={open && headerVisible}
                    style={{
                      "--UserNav-button-right": `calc(100vw - ${
                        box.right - 15
                      }px)`,
                      "--UserNav-button-top": `${box.bottom}px`,
                    }}
                  >
                    <Styled.SubnavItem>
                      <Styled.SubnavLink as="a" href={userProfilePage.uri}>
                        <IconComposer icon="account" />
                        {userProfilePage.title}
                      </Styled.SubnavLink>
                    </Styled.SubnavItem>
                    <Styled.SubnavItem>
                      <Styled.SubnavLink
                        as="button"
                        type="button"
                        onClick={signOut}
                      >
                        <IconComposer icon="logOut" />
                        {t("auth.log_out")}
                      </Styled.SubnavLink>
                    </Styled.SubnavItem>
                  </Popover.Panel>
                </Portal>
              </Styled.DropdownWrapper>
            )}
          </Popover>
        ) : null
        // uncomment to restore sign-in
        // <>
        //   <Styled.Toggle onClick={() => openModal("signIn")}>
        //     {t("auth.log_in")}
        //   </Styled.Toggle>
        //   <Styled.RegisterToggle onClick={() => openModal("register")}>
        //     {t("auth.sign_up")}
        //   </Styled.RegisterToggle>
        // </>
      }
    </Styled.Nav>
  );
}

UserNav.displayName = "Global.Header.UserNav";

UserNav.propTypes = {
  headerVisible: PropTypes.bool,
  userProfilePage: PropTypes.object,
};

export default UserNav;
