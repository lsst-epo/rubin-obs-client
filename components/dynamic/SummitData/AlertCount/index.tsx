import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import { formatLargeNumber } from "@/helpers/formatters";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import clsx from "clsx";
import styles from "./styles.module.css";

interface AlertCountProps {
  tooltipText: string | null;
}

const AlertCount: FC<AlertCountProps> = ({ tooltipText }) => {
  const { t } = useTranslation();
  const {
    summitData: { alertCount },
    isLoading,
  } = useSummitData();

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  return (
    <WidgetSection
      tooltipText={tooltipText}
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
