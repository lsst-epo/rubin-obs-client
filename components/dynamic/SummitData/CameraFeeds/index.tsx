import { FC } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import CurrentImage from "./AllSky/CurrentImage";
import clsx from "clsx";
import styles from "./styles.module.css";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";

interface CameraFeedsProps {
  tooltipText: string | null;
}

const CameraFeeds: FC<CameraFeedsProps> = ({ tooltipText }) => {
  const { t } = useTranslation();
  const {
    summitMedia: {
      items: { allSkyImage },
    },
    isLoading,
  } = useSummitData();

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  // While loading, show the title and the loading animation
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.all_sky_image.title")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <Loader isVisible={true} />
        </div>
      </WidgetSection>
    );
  }

  // If bad data: show the title, offline icon, offline message, and the info icon if applicable
  if (allSkyImage === undefined || allSkyImage === null) {
    return (
      <WidgetSection
        tooltipText={tooltipText}
        isCollapsible={false}
        title={t("summit_dashboard.sections.all_sky_image.title")}
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
      title={t("summit_dashboard.sections.all_sky_image.title")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <CurrentImage image={allSkyImage} />
      </div>
    </WidgetSection>
  );
};

CameraFeeds.displayName = "Dynamic.CameraFeeds";

export default CameraFeeds;
