import { useState, FC } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import CurrentImage from "./AllSky/CurrentImage";
import clsx from "clsx";
import styles from "./styles.module.css";

interface CameraFeedsProps {
  isCompact: boolean;
  tooltipText: string | null;
}

const CameraFeeds: FC<CameraFeedsProps> = ({ isCompact, tooltipText }) => {
  const { t } = useTranslation();
  const {
    summitMedia: {
      items: { allSkyImage, allSkyVideo },
    },
    astroweatherData,
    isLoading,
  } = useSummitData();
  const [isModalOpen, setModalOpen] = useState(false);

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  return (
    <WidgetSection
      tooltipText={tooltipText}
      isCollapsible={false}
      title={t("summit_dashboard.sections.all_sky_image.title")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        {stillLoading ? (
          <Loader isVisible={true} />
        ) : (
          <CurrentImage image={allSkyImage} />
        )}
      </div>
    </WidgetSection>
  );
};

CameraFeeds.displayName = "Dynamic.CameraFeeds";

export default CameraFeeds;
