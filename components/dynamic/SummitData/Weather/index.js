import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import DewpointCurrent from "@/components/widgets/CurrentData/patterns/Dewpoint";
import TemperatureCurrent from "@/components/widgets/CurrentData/patterns/Temperature";
import { useSummitData } from "@/contexts/SummitData";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { convertTemperature } from "@/helpers/converters";
import HourlyWeather from "./Hourly";
import CurrentWeather from "./Current";
import DailyWeather from "./Daily";

const Weather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [{ tempUnit }] = useWeatherUnit();
  const {
    data: { current },
    isLoading,
  } = useSummitData();

  const previewProps = {
    title: t("summit_dashboard.sections.weather.preview"),
  };

  if (isLoading || !current)
    return (
      <WidgetPreview {...previewProps}>
        <Loader isVisible={true} />
      </WidgetPreview>
    );

  const { temperature0, dewPoint } = current;
  const temperature = convertTemperature(temperature0, tempUnit);
  const dewpoint = convertTemperature(dewPoint, tempUnit);

  return (
    <WidgetPreview
      {...previewProps}
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <TemperatureCurrent unit={tempUnit} temperature={temperature} />
      <DewpointCurrent dewpoint={dewpoint} unit={tempUnit} />
      <SummitStatusModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <CurrentWeather />
        <HourlyWeather />
        <DailyWeather />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
