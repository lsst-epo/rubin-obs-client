import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import { formatLargeNumber } from "@/helpers/formatters";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import clsx from "clsx";
import styles from "./styles.module.css";

const AlertCount = () => {
  const { t } = useTranslation();
  const {
    summitData: { alertCount },
    isLoading,
  } = useSummitData();

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  return (
    <WidgetSection
      isCollapsible={false}
      title={t("summit_dashboard.sections.alert_count.title")}
      caption={t("summit_dashboard.sections.alert_count.caption")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        {stillLoading ? (
          <Loader isVisible={true} />
        ) : (
          <span>{formatLargeNumber(alertCount)}</span>
        )}
      </div>
    </WidgetSection>
  );
};

AlertCount.displayName = "Dynamic.AlertCount";

export default AlertCount;
