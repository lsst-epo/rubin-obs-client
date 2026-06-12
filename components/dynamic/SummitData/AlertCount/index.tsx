import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import { formatLargeNumber } from "@/helpers/formatters";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

interface AlertCountProps {
  tooltipLabel: string | undefined;
  tooltipText: string | undefined;
}

const AlertCount: FC<AlertCountProps> = ({ tooltipLabel, tooltipText }) => {
  const { t } = useTranslation();
  const {
    summitData: { alertCount },
    timeBasedLabels: { alertsTitle },
    isLoading,
  } = useSummitData();
  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;
  const alertCountStr = `${alertCount} alerts`;

  // While loading, show the title and the loading animation
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.alert_count.default_title")}
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
  if (alertCount === undefined || alertCount === null) {
    return (
      <WidgetSection
        tooltipLabel={tooltipLabel}
        tooltipText={tooltipText}
        isCollapsible={false}
        title={alertsTitle}
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
      tooltipLabel={tooltipLabel}
      tooltipText={tooltipText}
      isCollapsible={false}
      title={alertsTitle}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <span aria-hidden="true">{formatLargeNumber(alertCount)}</span>
        <span className={styles.srOnly}>{alertCountStr}</span>
      </div>
    </WidgetSection>
  );
};

AlertCount.displayName = "Dynamic.AlertCount";

export default AlertCount;
