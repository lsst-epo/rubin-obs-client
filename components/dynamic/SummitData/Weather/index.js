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
import * as Styled from "./styles";

const Weather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [{ tempUnit }] = useWeatherUnit();
  const {
    summitData: { current },
    isLoading,
  } = useSummitData();
  const previewProps = {
    title: t("summit_dashboard.sections.weather.preview"),
  };

  if (isLoading.efd || !current)
    return (
      <WidgetPreview {...previewProps}>
        <Loader isVisible={true} />
      </WidgetPreview>
    );

  const { temperature0, dewPoint } = current;

  return (
    <WidgetPreview
      {...previewProps}
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      {temperature0 && dewPoint && (
        <Styled.CondensedBackground $variant="secondary">
          <TemperatureCurrent
            unit={tempUnit}
            temperature={convertTemperature(temperature0, tempUnit)}
          />
          <DewpointCurrent
            dewpoint={convertTemperature(dewPoint, tempUnit)}
            unit={tempUnit}
          />
        </Styled.CondensedBackground>
      )}
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
