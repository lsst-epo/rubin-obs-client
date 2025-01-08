"use client";
import { FC } from "react";
import styles from "./styles.module.css";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useTranslation } from "react-i18next";
import { useSafeBackNavigation } from "@/contexts/History";

interface CloseButtonProps {
  fallback: string;
}

export const CloseButton: FC<CloseButtonProps> = ({ fallback }) => {
  const { safeBackNavigation } = useSafeBackNavigation({
    fallback,
    matches: fallback,
  });
  const { t } = useTranslation();

  return (
    <button
      className={styles.closeLink}
      onClick={() => safeBackNavigation()}
      title={t("gallery.back-to-gallery")}
    >
      <IconComposer icon="close" />
      <span className="a-hidden">{t("gallery.back-to-gallery")}</span>
    </button>
  );
};
