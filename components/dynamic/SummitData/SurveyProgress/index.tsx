import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/SummitStatus/WidgetPreview";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import styles from "./styles.module.css";
import clsx from "clsx";
import { ProgressRadial } from "@rubin-epo/epo-react-lib";

const SurveyProgress = () => {
  const { t } = useTranslation();
  const { surveyProgress, isLoading } = useSummitData();

  console.info("logging surveyProgress: ", surveyProgress);
  console.info(
    "logging surveyProgress.completion: ",
    surveyProgress.completion
  );
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading.hasura === undefined || isLoading.hasura) {
    return (
      <WidgetPreview
        title="Observation-related information"
        openModalCallback={() => {
          setModalOpen(true);
        }}
      >
        <Loader isVisible={true} />
      </WidgetPreview>
    );
  }

  return (
    <WidgetSection
      isCollapsible={false}
      title={t("summit_dashboard.sections.survey_progress.title")}
      caption={t("summit_dashboard.sections.survey_progress.caption")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <ProgressRadial value={surveyProgress.completion} />
      </div>
    </WidgetSection>
  );
};

SurveyProgress.displayName = "Dynamic.SurveyProgress";

export default SurveyProgress;
