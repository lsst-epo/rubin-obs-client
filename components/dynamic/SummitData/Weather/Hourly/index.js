import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/WidgetSection";
import Windspeed from "@/components/widgets/HourlyData/patterns/Windspeed";
import { convertWindspeed } from "@/helpers/converters";

const HourlyWeather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ windspeedUnit }] = useWeatherUnit();
  const { hourlyData, loading = true } = useSummitData();
  const sectionProps = {
    title: t("summit_dashboard.sections.weather.hourly"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  if (loading && !hourlyData)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const windspeedData = hourlyData
    .slice(0, -1)
    .map(({ _time, direction_mean: direction, speed_mean }) => {
      return {
        direction,
        time: new Date(_time),
        windspeed: convertWindspeed(speed_mean, windspeedUnit),
      };
    });

  return (
    <WidgetSection {...sectionProps}>
      <Windspeed unit={windspeedUnit} windspeedData={windspeedData} />
    </WidgetSection>
  );
};

HourlyWeather.displayName = "Dynamic.Weather.Hourly";

export default HourlyWeather;
