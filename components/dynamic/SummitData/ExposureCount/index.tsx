import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

const ExposureCount = (isCompact) => {
  const { t } = useTranslation();
  const {
    summitData: { exposureCount },
    isLoading,
  } = useSummitData();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading.hasura === undefined || isLoading.hasura) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.exposure_count.title")}
        caption={t("summit_dashboard.sections.exposure_count.caption")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <Loader isVisible={true} />
        </div>
      </WidgetSection>
    );
  }

  if (isCompact && exposureCount !== undefined) {
    return (
      <WidgetSection
        tooltipText={"text from exposure count"}
        isCollapsible={false}
        title={t("summit_dashboard.sections.exposure_count.title")}
        caption={t("summit_dashboard.sections.exposure_count.caption")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <UniqueIconComposer icon="TelescopeFootprint"></UniqueIconComposer>
          <span>{exposureCount}</span>
        </div>
      </WidgetSection>
    );
  }
};

ExposureCount.displayName = "Dynamic.ExposureCount";

export default ExposureCount;
