"use client";
import { FC } from "react";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useTranslation } from "react-i18next";
import { useSafeBackNavigation } from "@/contexts/History";
import styles from "./styles.module.css";

interface BackToGalleryProps {
  fallback: string;
}

export const BackToGallery: FC<BackToGalleryProps> = ({ fallback }) => {
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

BackToGallery.displayName = "Organism.Gallery.Back";

export default BackToGallery;
