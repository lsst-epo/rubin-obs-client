import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import PrecipitationCurrent from "@/components/widgets/CurrentData/patterns/Precipitation";
import TemperatureCurrent from "@/components/widgets/CurrentData/patterns/Temperature";
import { useSummitData } from "@/contexts/SummitData";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { convertTemperature } from "@/helpers/converters";
import DailyWeather from "./Daily";
import HourlyWeather from "./Hourly";
import CurrentWeather from "./Current";

const Weather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [{ tempUnit, windspeedUnit }] = useWeatherUnit();
  const { currentData, loading = true } = useSummitData();

  const previewProps = {
    title: t("summit_dashboard.sections.weather.preview"),
  };

  if (loading && !currentData)
    return (
      <WidgetPreview {...previewProps}>
        <Loader isVisible={true} />
      </WidgetPreview>
    );

  const { temperature0, relativeHumidity } = currentData;
  const temperature = convertTemperature(temperature0, tempUnit);

  return (
    <WidgetPreview
      {...previewProps}
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <TemperatureCurrent unit={tempUnit} temperature={temperature} />
      <PrecipitationCurrent humidity={relativeHumidity / 100} />
      <SummitStatusModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        {...{ tempUnit, windspeedUnit }}
      >
        <CurrentWeather />
        <HourlyWeather />
        <DailyWeather />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
