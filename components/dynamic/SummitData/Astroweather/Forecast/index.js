import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import { convertTemperature } from "@/helpers/converters";

import WidgetSection from "@/components/layout/WidgetSection";
import MoonRise from "@/components/widgets/CurrentData/patterns/MoonRise";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";
import DailyMoonrise from "@/components/widgets/DailyData/patterns/Moonrise";
import { SectionSubHeader } from "@/components/layout/WidgetSection/styles";
import Loader from "@/components/atomic/Loader";
import DewpointCurrent from "@/components/widgets/CurrentData/patterns/Dewpoint";

const ForecastAstroweather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ tempUnit }] = useWeatherUnit();
  const {
    data: { current },
    astroweatherData,
    isLoading,
  } = useSummitData();

  const sectionProps = {
    title: t("summit_dashboard.sections.astro.title"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  if (isLoading.astroweather || isLoading.efd || !current || !astroweatherData)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const { lunarPhase: phase, lunarTimes: times } = astroweatherData;

  const moonriseId = "moonriseTitle";
  const now = new Date();

  const { dewPoint } = current;
  const dewpoint = convertTemperature(dewPoint, tempUnit);

  return (
    <WidgetSection {...sectionProps}>
      <MoonPhase phase={phase} />
      <MoonRise
        rise={times[0].rise < now ? times[1].rise : times[0].rise}
        set={times[0].set < now ? times[1].set : times[0].set}
      />
      <DewpointCurrent dewpoint={dewpoint} unit={tempUnit} />
      <SectionSubHeader id={moonriseId}>
        {t("summit_dashboard.sections.astro.moonrise.forecast")}
      </SectionSubHeader>
      <DailyMoonrise data={times} labelledById={moonriseId} />
    </WidgetSection>
  );
};

ForecastAstroweather.displayName = "Dynamic.Astroweather.Forecast";

export default ForecastAstroweather;
