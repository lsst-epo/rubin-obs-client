import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/WidgetSection";
import TemperatureHistoric from "@/components/widgets/DailyData/patterns/Temperature";
import { convertTemperature } from "@/helpers/converters";

const DailyWeather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ tempUnit }] = useWeatherUnit();
  const {
    summitData: { daily },
    isLoading,
  } = useSummitData();
  const sectionProps = {
    title: t("summit_dashboard.sections.weather.daily", {
      unit: t(`summit_dashboard.unit_localization.${tempUnit}`),
    }),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  if (isLoading.efd || !daily)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const temperatureData = daily
    .slice(0, -1)
    .map(({ _time, temperature0_max: max, temperature0_min: min }) => {
      return {
        weekday: new Date(_time).getDay(),
        low: convertTemperature(min, tempUnit),
        high: convertTemperature(max, tempUnit),
      };
    });

  return (
    <WidgetSection {...sectionProps}>
      <TemperatureHistoric unit={tempUnit} temperatureData={temperatureData} />
    </WidgetSection>
  );
};

DailyWeather.displayName = "Dynamic.Weather.Daily";

export default DailyWeather;
