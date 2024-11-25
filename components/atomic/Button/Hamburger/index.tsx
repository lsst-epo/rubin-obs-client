"use client";
import { FunctionComponent } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import styles from "./styles.module.scss";

interface HamburgerProps {
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Hamburger: FunctionComponent<HamburgerProps> = ({
  active,
  onClick,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <button
      aria-haspopup="dialog"
      aria-expanded={active}
      onClick={onClick}
      className={classNames(styles.hamburger, className)}
    >
      <span className="a-hidden">{t("toggle-nav")}</span>
      <IconComposer icon="Hamburger" />
    </button>
  );
};

Hamburger.displayName = "Atom.Button.Hamburger";

export default Hamburger;
