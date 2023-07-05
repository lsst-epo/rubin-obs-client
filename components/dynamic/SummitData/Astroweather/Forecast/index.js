import { useState } from "react";
import SunCalc from "suncalc";
import { useTranslation } from "react-i18next";
import { lat, long, timezone } from "@/lib/observatory";
import { timezoneOffset } from "@/helpers";
import WidgetSection from "@/components/layout/WidgetSection";
import MoonRise from "@/components/widgets/CurrentData/patterns/MoonRise";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";

const ForecastAstroweather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const sectionProps = {
    title: t("summit_dashboard.sections.astro.title"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  const now = new Date();
  const offset = timezoneOffset(timezone);

  const observatoryDate = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  observatoryDate.setUTCHours(12 - offset, 0, 0, 0);

  const { phase } = SunCalc.getMoonIllumination(now);
  const { rise, set } = SunCalc.getMoonTimes(observatoryDate, lat, long, true);

  return (
    <WidgetSection {...sectionProps}>
      <MoonPhase phase={phase} />
      <MoonRise rise={rise} set={set} />
    </WidgetSection>
  );
};

ForecastAstroweather.displayName = "Dynamic.Astroweather.Forecast";

export default ForecastAstroweather;
