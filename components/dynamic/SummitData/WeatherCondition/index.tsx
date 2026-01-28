import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

const WeatherCondition = () => {
  const { t } = useTranslation();
  const {
    currentWeatherArtifacts: { svgName, weatherDescription },
    isLoading,
  } = useSummitData();

  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  return (
    <WidgetSection
      isCollapsible={false}
      title={t("summit_dashboard.sections.weather_condition.title")}
      caption={weatherDescription}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        {stillLoading ? (
          <Loader isVisible={true} />
        ) : (
          <UniqueIconComposer icon={svgName} />
        )}
      </div>
    </WidgetSection>
  );
};

WeatherCondition.displayName = "Dynamic.WeatherCondition";

export default WeatherCondition;
