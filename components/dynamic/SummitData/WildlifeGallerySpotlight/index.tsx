import { FC } from "react";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import GallerySpotlight from "@/components/molecules/GallerySpotlight";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

interface WildlifeGallerySpotlightProps {
  tooltipText: string | null;
  gallery: any;
}

const WildlifeGallerySpotlight: FC<WildlifeGallerySpotlightProps> = ({
  tooltipText,
  gallery,
}) => {
  const { t } = useTranslation();

  // If bad data: show the title, offline icon, offline message, and the info icon if applicable
  if (gallery === undefined || gallery === null) {
    return (
      <WidgetSection
        tooltipText={tooltipText}
        isCollapsible={false}
        title={t("summit_dashboard.sections.wildlife_spotlight.title")}
        caption={t("summit_dashboard.error_message")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <UniqueIconComposer icon="Offline" />
        </div>
      </WidgetSection>
    );
  }

  // Otherwise, render the complete widget
  const { slug, assetAlbum } = gallery;

  return (
    <WidgetSection
      tooltipText={tooltipText}
      isCollapsible={false}
      title={t("summit_dashboard.sections.wildlife_spotlight.title")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <GallerySpotlight gallerySlug={slug} images={assetAlbum} />
      </div>
    </WidgetSection>
  );
};

WildlifeGallerySpotlight.displayName = "Dynamic.WildlifeGallerySpotlight";

export default WildlifeGallerySpotlight;
