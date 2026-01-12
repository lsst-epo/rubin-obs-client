import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import clsx from "clsx";
import styles from "./styles.module.css";

const AlertCount = (isCompact) => {
  const { t } = useTranslation();
  const {
    // TODO: Uncomment this when the alert count data source is up
    // summitData: { alertCount },
    isLoading,
  } = useSummitData();

  // TODO: Delete this when the alert count data source is up
  const alertCount = 1234;

  if (isLoading.hasura === undefined || isLoading.hasura) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.alert_count.title")}
        caption={t("summit_dashboard.sections.alert_count.caption")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <Loader isVisible={true} />
        </div>
      </WidgetSection>
    );
  }

  if (isCompact && alertCount !== undefined) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.alert_count.title")}
        caption={t("summit_dashboard.sections.alert_count.caption")}
      >
        <div
          className={clsx(styles.widgetBackground, styles.condensedBackground)}
        >
          <span>{alertCount}</span>
        </div>
      </WidgetSection>
    );
  }
};

AlertCount.displayName = "Dynamic.AlertCount";

export default AlertCount;
