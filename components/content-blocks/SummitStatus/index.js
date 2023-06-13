import PropTypes from "prop-types";
import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "react-i18next";
import WeatherUnitContext from "@/contexts/WeatherUnit";
import UnitLocalization from "@/components/layout/UnitLocalization";
import WidgetGrid from "@/components/layout/WidgetGrid";
import WidgetPreview from "@/components/layout/WidgetPreview";
import TemperatureCurrent from "@/components/widgets/TemperatureCurrent";
import PrecipitationCurrent from "@/components/widgets/PrecipitationCurrent";
import TemperatureHistoric from "@/components/widgets/TemperatureHistoric";
import WindspeedHourly from "@/components/widgets/HourlyData/patterns/Windspeed";
import PrecipitationHourly from "@/components/widgets/HourlyData/patterns/Precipitation";

const SummitStatus = ({ summitStatusLayout, widgetPreviews = [] }) => {
  /** this logic should be changed to useRouter after i18n refactor */
  const {
    i18n: { language = "en" },
  } = useTranslation();
  const [windspeedUnit, setWindspeedUnit] = useState(
    language === "en" ? "NM" : "m"
  );
  const [tempUnit, setTempUnit] = useState(
    language === "en" ? "fahrenheit" : "celsius"
  );

  const mockWindspeedData = [
    { windspeed: 5.2342342, direction: 120 },
    { windspeed: 4.7, direction: 112 },
    { windspeed: 6.1, direction: 98 },
    { windspeed: 3.8, direction: 105 },
    { windspeed: 5.5, direction: 117 },
    { windspeed: 7.2, direction: 125 },
    { windspeed: 4.3, direction: 103 },
    { windspeed: 6.8, direction: 108 },
    { windspeed: 5.14343, direction: 115 },
    { windspeed: 4.9, direction: 98 },
    { windspeed: 5.7, direction: 105 },
    { windspeed: 6.5, direction: 114 },
    { windspeed: 3.9, direction: 99 },
    { windspeed: 4.1, direction: 102 },
    { windspeed: 5.3, direction: 108 },
    { windspeed: 6.3, direction: 116 },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  const mockPrecipitationData = [
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.0 },
    { probability: 0.01 },
    { probability: 0.02 },
    { probability: 0.03 },
    { probability: 0.04 },
    { probability: 0.05 },
    { probability: 0.03 },
    { probability: 0.02 },
    { probability: 0.1 },
    { probability: 0.04 },
    { probability: 0.03 },
    { probability: 0.0 },
    { probability: 0.02 },
    { probability: 0.01 },
    { probability: 0.02 },
    { probability: 0.03 },
    { probability: 0.02 },
  ];

  const timedWindpeedData = mockWindspeedData.map(
    ({ windspeed, direction }, i) => {
      return { windspeed, direction, time: new Date().setHours(i, 0, 0, 0) };
    }
  );

  const timedPrecipitationData = mockPrecipitationData.map(
    ({ probability }, i) => {
      return { probability, time: new Date().setHours(i, 0, 0, 0) };
    }
  );

  return (
    <Container bgColor="neutral95" width="wide" paddingSize="small">
      <WeatherUnitContext.Provider value={{ tempUnit, windspeedUnit }}>
        <UnitLocalization
          {...{ tempUnit, windspeedUnit }}
          onTempChangeCallback={(value) => setTempUnit(value)}
          onWindChangeCallback={(value) => setWindspeedUnit(value)}
        />
        <WidgetGrid>
          <WidgetPreview>
            <TemperatureCurrent unit={tempUnit} temperature={23.9349824} />
            <PrecipitationCurrent
              precipitation={0.0354}
              humidity={0.45234991292923}
            />
          </WidgetPreview>
          <WidgetPreview size="large">
            <TemperatureHistoric
              temperatureData={[
                { weekday: 1, high: 23, low: 15 },
                { weekday: 2, high: 26, low: 17 },
                { weekday: 3, high: 28, low: 15 },
                { weekday: 4, high: 31, low: 16 },
                { weekday: 5, high: 29, low: 14 },
                { weekday: 6, high: 29, low: 11 },
                { weekday: 0, high: 32, low: 14 },
              ]}
              unit={tempUnit}
            />
          </WidgetPreview>
          <WidgetPreview size="large">
            <WindspeedHourly
              unit={windspeedUnit}
              windspeedData={timedWindpeedData}
            />
          </WidgetPreview>
          <WidgetPreview size="large">
            <PrecipitationHourly precipitationData={timedPrecipitationData} />
          </WidgetPreview>
        </WidgetGrid>
      </WeatherUnitContext.Provider>
    </Container>
  );
};

SummitStatus.propTypes = {
  summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
  widgetPreviews: PropTypes.arrayOf({}),
};

SummitStatus.displayName = "ContentBlock.SummitStatus";

export default SummitStatus;
