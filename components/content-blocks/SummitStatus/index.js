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
import TemperatureHistoric from "@/components/widgets/TemperatureHIstoric";
import { useEfd } from "@/api/efd";

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

  const [data, loading] = useEfd();
  // eslint-disable-next-line no-console
  console.log({ data, loading });
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
