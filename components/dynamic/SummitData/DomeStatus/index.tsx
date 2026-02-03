import { FC } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

interface DomeStatusProps {
  tooltipText: string | null;
}

const DomeStatus: FC<DomeStatusProps> = ({ tooltipText }) => {
  const { t } = useTranslation();
  const {
    // summitData: { domeStatus },
    isLoading,
  } = useSummitData();

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;
  const domeStatus = null;

  // If bad data: show the title, offline icon, offline message, and the info icon if applicable
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.dome_status.title")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <Loader isVisible={true} />
        </div>
      </WidgetSection>
    );
  }

  // If bad data, show the title, offline icon, and the info icon if applicable
  if (domeStatus === undefined || domeStatus === null) {
    return (
      <WidgetSection
        tooltipText={tooltipText}
        isCollapsible={false}
        title={t("summit_dashboard.sections.dome_status.title")}
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
  return (
    <WidgetSection
      tooltipText={tooltipText}
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
};

DomeStatus.displayName = "Dynamic.DomeStatus";

export default DomeStatus;
