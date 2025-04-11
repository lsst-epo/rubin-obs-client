"use client";

import { FC } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { env } from "@/env";
import {
  CopyUrlButton,
  FacebookButton,
  TwitterXButton,
  EmailButton,
  LinkedInButton,
} from "@rubin-epo/epo-react-lib/Share";
import styles from "./styles.module.css";

interface ShareProps {
  title?: string;
  url?: string;
  variant?: "primary" | "large";
  className?: string;
}

const Share: FC<ShareProps> = ({ title, url, variant, className }) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const shareProps = {
    url: url || new URL(pathname || "", env.NEXT_PUBLIC_BASE_URL).toString(),
    title,
  };

  const shares = [
    FacebookButton,
    TwitterXButton,
    LinkedInButton,
    EmailButton,
    CopyUrlButton,
  ];

  return (
    <ul
      data-variant={variant}
      className={clsx(styles.shareList, className)}
      aria-label={t("share.label_current")}
    >
      {shares.map((Share, i) => {
        return (
          <li key={i}>
            <Share {...shareProps} />
          </li>
        );
      })}
    </ul>
  );
};

Share.displayName = "Molecule.Share";

export default Share;
