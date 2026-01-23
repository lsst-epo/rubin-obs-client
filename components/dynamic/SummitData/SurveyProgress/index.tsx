import { FC } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import styles from "./styles.module.css";
import clsx from "clsx";
import { ProgressRadial } from "@rubin-epo/epo-react-lib";

interface SurveyProgressProps {
  tooltipText: string | null;
}

const SurveyProgress: FC<SurveyProgressProps> = ({ tooltipText }) => {
  const { t } = useTranslation();
  const {
    summitData: { surveyProgress },
    isLoading,
  } = useSummitData();

  const progressFormatter = (value) =>
    Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(value / 100);

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  return (
    <WidgetSection
      tooltipText={tooltipText}
      isCollapsible={false}
      title={t("summit_dashboard.sections.survey_progress.title")}
      caption={t("summit_dashboard.sections.survey_progress.caption")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        {stillLoading ? (
          <Loader isVisible={true} />
        ) : (
          <ProgressRadial
            value={surveyProgress}
            role={"progressbar"}
            min={0}
            max={100}
            markerFormatter={progressFormatter}
          />
        )}
      </div>
    </WidgetSection>
  );
};

SurveyProgress.displayName = "Dynamic.SurveyProgress";

export default SurveyProgress;
