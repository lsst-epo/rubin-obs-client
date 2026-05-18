import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import clsx from "clsx";
import styles from "./styles.module.css";

import { lat, long, altitude } from "@/lib/observatory";
import { getTimes } from "@/lib/suncalc";

interface SunsetSunriseProps {
  tooltipText: string | null;
}

function getSunsetAndSunrise(
  currentCSTTimeStr: string,
  currentCSTDateStr: string
): { sunset: Date; sunrise: Date } {
  const [year, month, day] = currentCSTDateStr.split("-").map(Number);
  const [time, modifier] = currentCSTTimeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Note that the year/month/day/hour/minute values from the context provider are in CST,
  // but the Date() object holds no timezone information and will treat the input as local time.
  const currentCSTDateTime = new Date(year, month - 1, day, hours, minutes);

  // The returned Date from getTimes() are also CST values, but will have the local timezone appended if you print it.
  const todaysTimes = getTimes(currentCSTDateTime, lat, long, altitude);

  let sunset, sunrise;

  if (currentCSTDateTime <= todaysTimes.sunrise) {
    const yesterday = new Date(currentCSTDateTime);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaysTimes = getTimes(yesterday, lat, long, altitude);
    sunset = yesterdaysTimes.sunset;
    sunrise = todaysTimes.sunrise;
  } else {
    const tomorrow = new Date(currentCSTDateTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowsTimes = getTimes(tomorrow, lat, long, altitude);
    sunset = todaysTimes.sunset;
    sunrise = tomorrowsTimes.sunrise;
  }

  return { sunset, sunrise };
}

function formatSolarTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SunsetSunrise: FC<SunsetSunriseProps> = ({ tooltipText }) => {
  const { t } = useTranslation();
  const { astroweatherData, localeContextInfo, isLoading } = useSummitData();
  const stillLoading = isLoading.hasura === undefined || isLoading.hasura;

  // While loading, show the title and the loading animation
  if (stillLoading) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.sunrise_sunset.title")}
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
  if (localeContextInfo === undefined || localeContextInfo === null) {
    return (
      <WidgetSection
        tooltipText={tooltipText}
        isCollapsible={false}
        title={t("summit_dashboard.sections.sunrise_sunset.title")}
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
  const { time, date } = localeContextInfo;
  const { sunset, sunrise } = getSunsetAndSunrise(time, date);

  return (
    <WidgetSection
      tooltipText={tooltipText}
      isCollapsible={false}
      title={t("summit_dashboard.sections.sunrise_sunset.title")}
    >
      <div
        className={clsx(styles.widgetBackground, styles.condensedBackground)}
      >
        <div className={clsx(styles.sunsetSunriseContainer)}>
          <div className={clsx(styles.sunsetTime)}>
            {/* TODO: Add sunset icon */}
            {formatSolarTime(sunset)}
          </div>
          <div className={clsx(styles.sunriseTime)}>
            {/* TODO: Add sunrise icon */}
            {formatSolarTime(sunrise)}
          </div>
        </div>
      </div>
    </WidgetSection>
  );
};

SunsetSunrise.displayName = "Dynamic.SunsetSunrise";

export default SunsetSunrise;
