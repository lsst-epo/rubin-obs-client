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

  // While loading, show the title and the loading animation
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.weather_condition.title")}
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
  if (
    svgName === undefined ||
    svgName === null ||
    weatherDescription === undefined ||
    weatherDescription === null
  ) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.weather_condition.title")}
        caption={t("summit_dashboard.error_message")}
      >
        <div
          className={clsx(
            styles.widgetBackground,
            styles.condensedBackground,
            styles.errorTheme
          )}
        >
          <UniqueIconComposer icon="Offline" />
        </div>
      </WidgetSection>
    );
  }

  // Otherwise, render the complete widget
  return (
    <WidgetSection
      isCollapsible={false}
      title={t("summit_dashboard.sections.weather_condition.title")}
      caption={weatherDescription}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <UniqueIconComposer icon={svgName} />
      </div>
    </WidgetSection>
  );
};

WeatherCondition.displayName = "Dynamic.WeatherCondition";

export default WeatherCondition;
