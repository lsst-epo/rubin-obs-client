import { useState } from "react";
import SunCalc from "suncalc-tz";
import { useTranslation } from "react-i18next";
import { lat, long } from "@/lib/observatory";
import WidgetSection from "@/components/layout/WidgetSection";
import MoonRise from "@/components/widgets/CurrentData/patterns/MoonRise";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";
import DailyMoonrise from "@/components/widgets/DailyData/patterns/Moonrise";
import { SectionSubHeader } from "@/components/layout/WidgetSection/styles";

const ForecastAstroweather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const sectionProps = {
    title: t("summit_dashboard.sections.astro.title"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  const moonriseId = "moonriseTitle";
  const now = new Date();

  const { phase } = SunCalc.getMoonIllumination(now);

  const conversion = 180 / Math.PI;
  const getAzimuth = (time) =>
    SunCalc.getMoonPosition(time, lat, long).azimuth * conversion + 180;

  const forecast = Array.apply(null, Array(14)).map((value, i) => {
    const day = new Date();
    day.setDate(now.getDate() + i);
    const { rise, set } = SunCalc.getMoonTimes(day, lat, long);

    return {
      day: day.getDay(),
      rise,
      set,
      azimuthRise: rise ? getAzimuth(rise) : null,
      azimuthSet: set ? getAzimuth(set) : null,
    };
  });

  return (
    <WidgetSection {...sectionProps}>
      <MoonPhase phase={phase} />
      <MoonRise rise={forecast[0].rise} set={forecast[0].set} />
      <SectionSubHeader id={moonriseId}>
        {t("summit_dashboard.sections.astro.moonrise.forecast")}
      </SectionSubHeader>
      <DailyMoonrise data={forecast} labelledById={moonriseId} />
    </WidgetSection>
  );
};

ForecastAstroweather.displayName = "Dynamic.Astroweather.Forecast";

export default ForecastAstroweather;
