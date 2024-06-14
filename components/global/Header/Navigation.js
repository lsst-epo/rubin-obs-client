import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useClickEvent, useAuthModal } from "@/hooks";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { internalLinkWithChildrenShape } from "@/shapes/link";
import LanguageSelect from "./LanguageSelect";
import NavItem from "./NavItem";
import NavItemWithChildren from "./NavItemWithChildren";

export default function Navigation({
  items,
  userProfilePage,
  theme = "desktop",
  desktopSetter,
  mobileActive,
  mobileSetter,
}) {
  const mobileLangSelectId = "mobileLangSelect";
  const [active, setActive] = useState(null);
  const navList = useRef();
  const { openModal } = useAuthModal();
  const { t } = useTranslation();
  const { isAuthenticated, status, signOut } = useAuthenticationContext();

  const showUserItems = isAuthenticated && status === "active";

  useClickEvent(handleClick);

  function handleClick(e) {
    const isLink =
      e.target.nodeName === "A" || e.target.parentElement?.nodeName === "A";
    const isMobileLangSelect = e.target.id === mobileLangSelectId;
    if (mobileSetter && mobileActive && (isLink || isMobileLangSelect)) {
      mobileSetter(false);
      setActive(null);
    }
    if (navList?.current?.contains(e.target)) return;
    setActive(null);
    if (desktopSetter) desktopSetter(false);
  }

  function handleToggleClick(id) {
    setActive((prevActive) => (prevActive === id ? null : id));
    if (desktopSetter) desktopSetter(true);
  }

  function handleSignOut() {
    setActive(null);
    if (mobileSetter) mobileSetter(false);
    signOut();
  }

  if (!items || items.length < 1) return null;

  return (
    <div
      ref={navList}
      className={classNames({
        "c-nav-list": true,
        [`c-nav-list--${theme}`]: !!theme,
        "c-nav-list--is-active": mobileActive,
      })}
    >
      <ul className="c-nav-list__list">
        {theme === "mobile" && (
          <li className="c-nav-list__lang">
            <LanguageSelect id={mobileLangSelectId} />
          </li>
        )}
        {items.map(({ id, title, uri, children }) => {
          const hasChildren = children && children.length > 0;

          return (
            <li key={id} className="c-nav-list__item">
              {hasChildren && (
                <NavItemWithChildren
                  id={id}
                  active={id === active}
                  title={title}
                  uri={uri}
                  childItems={children}
                  onToggleClick={handleToggleClick}
                  onEsc={() => setActive(null)}
                  theme={theme}
                />
              )}
              {!hasChildren && (
                <NavItem
                  href={`/${uri}`}
                  onClick={() => setActive(null)}
                  title={title}
                  theme={theme}
                />
              )}
            </li>
          );
        })}
        {theme === "mobile" && (
          <>
            {showUserItems && (
              <>
                <li className="c-nav-list__item">
                  <NavItem
                    onClick={() => {
                      setActive(null);
                    }}
                    href={userProfilePage.uri}
                    title={userProfilePage.title}
                    theme={theme}
                    className="a-bg-turquoise50 a-show-mobile"
                    icon="account"
                  />
                </li>
                <li className="c-nav-list__item">
                  <NavItem
                    onClick={handleSignOut}
                    title={t("auth.log_out")}
                    theme={theme}
                    className="a-show-mobile"
                    icon="logOut"
                  />
                </li>
              </>
            )}
            {!showUserItems && (
              <>
                <li className="c-nav-list__item">
                  <NavItem
                    onClick={() => {
                      setActive(null);
                      openModal("signIn");
                    }}
                    title={t("auth.log_in")}
                    theme={theme}
                    className="a-bg-turquoise50 a-show-mobile"
                  />
                </li>
                <li className="c-nav-list__item">
                  <NavItem
                    onClick={() => {
                      setActive(null);
                      openModal("register");
                    }}
                    title={t("auth.sign_up")}
                    theme={theme}
                    className="a-bg-turquoise50 a-show-mobile"
                  />
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

Navigation.displayName = "Header.Navigation";

Navigation.propTypes = {
  items: PropTypes.arrayOf(internalLinkWithChildrenShape),
  userProfilePage: PropTypes.object,
  theme: PropTypes.oneOf(["desktop", "mobile"]),
  desktopSetter: PropTypes.func,
  mobileActive: PropTypes.bool,
  mobileSetter: PropTypes.func,
};
