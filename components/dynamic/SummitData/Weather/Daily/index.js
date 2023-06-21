import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/WidgetSection";
<<<<<<< HEAD
import TemperatureHistoric from "@/components/widgets/DailyData/patterns/Temperature";
=======
import TemperatureHistoric from "@/components/widgets/TemperatureHistoric";
>>>>>>> ea86e5c ([F] SummitStatusModal)
import { convertTemperature } from "@/helpers/converters";

const DailyWeather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ tempUnit }] = useWeatherUnit();
<<<<<<< HEAD
  const {
    dailyData,
    loading: { dailyData: loading },
  } = useSummitData();
  const sectionProps = {
    title: t("summit_dashboard.sections.weather.daily", {
=======
  const { dailyData, loading = true } = useSummitData();
  const sectionProps = {
    title: t("summit_dashboard.sections.daily", {
>>>>>>> ea86e5c ([F] SummitStatusModal)
      unit: t(`summit_dashboard.unit_localization.${tempUnit}`),
    }),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

<<<<<<< HEAD
  if (loading || !dailyData)
=======
  if (loading && !dailyData)
>>>>>>> ea86e5c ([F] SummitStatusModal)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const temperatureData = dailyData
    .slice(0, -1)
<<<<<<< HEAD
    .map(({ _time, temperature0_max: max, temperature0_min: min }) => {
      return {
        weekday: new Date(_time).getDay(),
        low: convertTemperature(min, tempUnit),
        high: convertTemperature(max, tempUnit),
=======
    .map(({ _time, temperature0_max, temperature0_min }) => {
      return {
        weekday: new Date(_time).getDay(),
        low: convertTemperature(temperature0_min, tempUnit),
        high: convertTemperature(temperature0_max, tempUnit),
>>>>>>> ea86e5c ([F] SummitStatusModal)
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
