import WidgetPreview from "@/components/layout/WidgetPreview";
import TemperatureCurrent from "@/components/widgets/TemperatureCurrent";
import { useSummitData } from "@/contexts/SummitData";
import { defaultUnits, useWeatherUnit } from "@/contexts/WeatherUnit";
import convert from "convert";

const Weather = () => {
  const { tempUnit, windspeedUnit } = useWeatherUnit();
  const { data, loading } = useSummitData();

  if (loading || !data) return null;

  console.log({ data });

  const {
    temperature0: { _value: currentTemperature },
  } = data;

  const temperatureData = { currentTemperature };

  if ({ tempUnit, windspeedUnit } !== defaultUnits) {
    Object.entries(temperatureData).forEach(([key, value]) => {
      temperatureData[key] = convert(value, defaultUnits.tempUnit).to(tempUnit);
    });
  }

  return (
    <WidgetPreview
      title="Weather at the summit"
      callout="It is nice out there!"
    >
      <TemperatureCurrent
        unit={tempUnit}
        temperature={temperatureData.currentTemperature}
      />
    </WidgetPreview>
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
