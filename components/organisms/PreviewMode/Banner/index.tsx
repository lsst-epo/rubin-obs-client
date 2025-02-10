"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import endPreviewMode from "@/services/actions/endPreviewMode";
import styles from "./styles.module.css";

const Banner: FC = () => {
  const { t } = useTranslation();
  const [isLivePreview, setLivePreview] = useState(false);
  const { refresh } = useRouter();

  useEffect(() => {
    if (window && window.top !== window.self) {
      setLivePreview(true);
    }
  }, []);

  const handleDisable = async () => {
    await endPreviewMode();

    refresh();
  };

  if (isLivePreview) return null;

  return (
    <div className={styles.previewModeBanner}>
      <span className={styles.info}>
        <IconComposer icon="InfoCircle" />
        {t("preview_mode.is_enabled")}
      </span>
      <button className={styles.disableButton} onClick={handleDisable}>
        {t("preview_mode.disable")}
      </button>
    </div>
  );
};

Banner.displayName = "Organism.PreviewMode.Banner";

export default Banner;
