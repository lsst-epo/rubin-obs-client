import { FC } from "react";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import GallerySpotlight from "@/components/molecules/GallerySpotlight";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
// import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

const TITLE = "Wildlife Spotlight";

interface WildlifeGallerySpotlightProps {
  tooltipText: string | null;
  images: any;
}

const WildlifeGallerySpotlight: FC<WildlifeGallerySpotlightProps> = ({
  tooltipText,
  images,
}) => {
  // const { t } = useTranslation();

  // If bad data: show the title, offline icon, offline message, and the info icon if applicable
  if (images === undefined || images === null) {
    return (
      <WidgetSection
        tooltipText={tooltipText}
        isCollapsible={false}
        title={TITLE}
        // title={t("summit_dashboard.sections.wildlife_spotlight")}
        // caption={t("summit_dashboard.error_message")}
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
  return (
    <WidgetSection
      tooltipText={tooltipText}
      isCollapsible={false}
      title={TITLE}
      // title={t("summit_dashboard.sections.wildlife_spotlight")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <GallerySpotlight images={images} />
      </div>
    </WidgetSection>
  );
};

WildlifeGallerySpotlight.displayName = "Dynamic.WildlifeGallerySpotlight";

export default WildlifeGallerySpotlight;
