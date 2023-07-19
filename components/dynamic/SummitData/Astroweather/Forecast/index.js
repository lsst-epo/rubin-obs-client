import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getMoonIllumination,
  getMoonPosition,
  getMoonTimes,
} from "@/lib/suncalc";
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

  const { phase } = getMoonIllumination(now);

  const conversion = 180 / Math.PI;
  const getAzimuth = (time) =>
    getMoonPosition(time, lat, long).azimuth * conversion + 180;

  const forecast = Array.apply(null, Array(14)).map((value, i) => {
    const day = new Date();
    day.setDate(now.getDate() + i);
    const { rise, set } = getMoonTimes(day, lat, long);

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
      <MoonRise
        rise={forecast[0].rise < now ? forecast[1].rise : forecast[0].rise}
        set={forecast[0].set < now ? forecast[1].set : forecast[0].set}
      />
      <SectionSubHeader id={moonriseId}>
        {t("summit_dashboard.sections.astro.moonrise.forecast")}
      </SectionSubHeader>
      <DailyMoonrise data={forecast} labelledById={moonriseId} />
    </WidgetSection>
  );
};

ForecastAstroweather.displayName = "Dynamic.Astroweather.Forecast";

export default ForecastAstroweather;
