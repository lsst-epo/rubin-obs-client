import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

const DomeStatus = (isCompact) => {
  const { t } = useTranslation();
  const {
    summitData: { domeStatus },
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

  if (isCompact && domeStatus !== undefined) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.dome_status.title")}
        caption={
          domeStatus
            ? t("summit_dashboard.sections.dome_status.status_open")
            : t("summit_dashboard.sections.dome_status.status_closed")
        }
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          {domeStatus ? (
            <UniqueIconComposer icon="openedDome" />
          ) : (
            <UniqueIconComposer icon="closedDome" />
          )}
        </div>
      </WidgetSection>
    );
  }
};

DomeStatus.displayName = "Dynamic.DomeStatus";

export default DomeStatus;
