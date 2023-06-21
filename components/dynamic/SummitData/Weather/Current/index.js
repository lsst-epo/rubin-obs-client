import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/WidgetSection";
import TemperatureCurrent from "@/components/widgets/CurrentData/patterns/Temperature";
import WindspeedCurrent from "@/components/widgets/CurrentData/patterns/Windspeed";
import PrecipitationCurrent from "@/components/widgets/CurrentData/patterns/Precipitation";
import { convertTemperature, convertWindspeed } from "@/helpers/converters";

const CurrentWeather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ tempUnit, windspeedUnit }] = useWeatherUnit();
  const { currentData, loading = true } = useSummitData();
  const sectionProps = {
    title: t("summit_dashboard.sections.weather.current"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  if (loading || !currentData)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const { temperature0, windspeed, relativeHumidity } = currentData;
  const temperature = convertTemperature(temperature0, tempUnit);

  return (
    <WidgetSection {...sectionProps}>
      <TemperatureCurrent unit={tempUnit} temperature={temperature} />
      <WindspeedCurrent
        unit={windspeedUnit}
        windspeed={convertWindspeed(windspeed, windspeedUnit)}
      />
      <PrecipitationCurrent humidity={relativeHumidity / 100} />
    </WidgetSection>
  );
};

CurrentWeather.displayName = "Dynamic.Weather.Current";

export default CurrentWeather;
