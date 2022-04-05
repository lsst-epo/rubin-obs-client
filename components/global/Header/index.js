import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import useResizeObserver from "use-resize-observer";
import { useTranslation } from "react-i18next";
import Logo from "@/svg/unique/Logo";
import internalLinkShape from "@/shapes/link";
import { useGlobalData, useNavHider } from "@/lib/utils";
import {
  SignInModal,
  RegisterModal,
  SSOModal,
  ForgotPasswordModal,
  SetPasswordModal,
  ActivateModal,
} from "@/components/modal";
import { tokens } from "@/styles/globalStyles";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Hamburger from "./Hamburger";
import LanguageSelect from "./LanguageSelect";
import UserNavigation from "./UserNav";
import SRAuthStatus from "../../auth/SRAuthStatus";

export default function Header({ navItems, userProfilePage }) {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();
  const { localeInfo } = useGlobalData();
  const homeUrl = localeInfo.locale === "es" ? `/es` : `/`;

  useNavHider(prevScrollPos, setPrevScrollPos, visible, setVisible);

  const breakpoint = parseInt(tokens.BREAK_HEADER_LAYOUT, 10);
  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width >= breakpoint) setMobileNavActive(false);
      document.documentElement.style.setProperty(
        "--header-width",
        `${width}px`
      );
    },
  });

  return (
    <header
      ref={ref}
      className={`c-global-header ${
        visible || mobileNavActive ? "" : "invisible"
      }`}
    >
      <a href="#page-content" className="c-global-header__skip-link">
        {t("skip-to-content")}
      </a>
      <SRAuthStatus />
      <div className="c-global-header__logo-block">
        <Link href={homeUrl}>
          <a className="c-global-header__logo-link">
            <span className="a-hidden">{t("homepage")}</span>
            <Logo className="c-global-header__logo" />
          </a>
        </Link>
      </div>
      <nav className="c-global-header__nav-block">
        <Navigation items={navItems} theme="desktop" />
      </nav>
      <div className="c-global-header__search-block">
        <SearchBar />
      </div>
      <div className="c-global-header__toggle-block">
        {!mobileNavActive && <LanguageSelect />}
      </div>
      <div className="c-global-header__user-nav-block">
        <UserNavigation
          headerVisible={visible}
          userProfilePage={userProfilePage}
        />
      </div>
      <div className="c-global-header__hamburger-block">
        <Hamburger
          mobileNavActive={mobileNavActive}
          onClick={() => setMobileNavActive(!mobileNavActive)}
        />
      </div>
      <Navigation
        items={navItems}
        userProfilePage={userProfilePage}
        theme="mobile"
        mobileActive={mobileNavActive}
        mobileSetter={setMobileNavActive}
      />
      <SignInModal />
      <RegisterModal />
      <SSOModal />
      <ForgotPasswordModal />
      <SetPasswordModal />
      <ActivateModal />
    </header>
  );
}

Header.displayName = "Global.Header";

Header.propTypes = {
  navItems: PropTypes.arrayOf(internalLinkShape),
  userProfilePage: PropTypes.object,
};
