import { FC } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import styles from "./styles.module.css";
import clsx from "clsx";
import { ProgressRadial } from "@rubin-epo/epo-react-lib";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
interface SurveyProgressProps {
  tooltipLabel: string | undefined;
  tooltipText: string | undefined;
}

const SurveyProgress: FC<SurveyProgressProps> = ({
  tooltipLabel,
  tooltipText,
}) => {
  const { t } = useTranslation();
  const {
    summitData: { surveyProgress },
    isLoading,
  } = useSummitData();

  const progressFormatter = (value) =>
    Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 0,
    }).format(value / 100);

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  // While loading, show the title and the loading animation
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.survey_progress.title")}
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
  if (surveyProgress === undefined || surveyProgress === null) {
    return (
      <WidgetSection
        tooltipLabel={tooltipLabel}
        tooltipText={tooltipText}
        isCollapsible={false}
        title={t("summit_dashboard.sections.survey_progress.title")}
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
      title={t("summit_dashboard.sections.survey_progress.title")}
      caption={t("summit_dashboard.sections.survey_progress.caption")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
        aria-hidden="true"
      >
        <ProgressRadial
          value={surveyProgress}
          role={"progressbar"}
          min={0}
          max={100}
          markerFormatter={progressFormatter}
        />
      </div>

      <span className={styles.srOnly}>{`${progressFormatter(
        surveyProgress
      )} progress made`}</span>
    </WidgetSection>
  );
};

SurveyProgress.displayName = "Dynamic.SurveyProgress";

export default SurveyProgress;
