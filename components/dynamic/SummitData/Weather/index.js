import { useState } from "react";
<<<<<<< HEAD
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import WidgetSection from "@/components/layout/WidgetSection";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import PrecipitationCurrent from "@/components/widgets/PrecipitationCurrent";
import TemperatureCurrent from "@/components/widgets/TemperatureCurrent";
>>>>>>> ebb054c ([F] SummitData provider)
import { useSummitData } from "@/contexts/SummitData";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { convertTemperature } from "@/helpers/converters";
import DailyWeather from "./Daily";
import HourlyWeather from "./Hourly";

const Weather = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [{ tempUnit, windspeedUnit }] = useWeatherUnit();
  const { currentData, loading = true } = useSummitData();

  if (loading && !currentData)
    return (
      <WidgetPreview
        title="Weather at the summit"
        callout="It is nice out there!"
      >
        <Loader isVisible={true} />
      </WidgetPreview>
    );

  const { temperature0, relativeHumidity } = currentData;
  const temperature = convertTemperature(temperature0, tempUnit);

  return (
    <WidgetPreview
      title="Weather at the summit"
      callout="It is nice out there!"
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
        <WidgetSection title="Weather at the summit now">
          <TemperatureCurrent unit={tempUnit} temperature={temperature} />
          <PrecipitationCurrent humidity={relativeHumidity / 100} />
        </WidgetSection>
        <HourlyWeather />
        <DailyWeather />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
