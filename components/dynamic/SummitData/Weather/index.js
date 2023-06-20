import Loader from "@/components/atomic/Loader";
import PrecipitationCurrent from "@/components/widgets/PrecipitationCurrent";
import TemperatureCurrent from "@/components/widgets/TemperatureCurrent";
import { useSummitData } from "@/contexts/SummitData";
import { defaultUnits, useWeatherUnit } from "@/contexts/WeatherUnit";
import convert from "convert";

const Weather = () => {
  const { tempUnit, windspeedUnit } = useWeatherUnit();
  const { currentData: data, loading = true } = useSummitData();

  if (loading && !data) return <Loader isVisible={true} />;

  const { temperature0: temperature, relativeHumidity, windSpeed } = data;

  const temperatureData = {
    temperature,
  };

  const windspeedData = {
    windSpeed,
  };

  if (tempUnit !== defaultUnits.tempUnit) {
    Object.entries(temperatureData).forEach(([key, value]) => {
      temperatureData[key] = convert(value, defaultUnits.tempUnit).to(tempUnit);
    });
  }

  if (windspeedUnit !== defaultUnits.windspeedUnit) {
    Object.entries(windspeedData).forEach(([key, value]) => {
      windspeedData[key] = convert(value, defaultUnits.windspeedUnit).to(
        windspeedUnit
      );
    });
  }

  return (
    <>
      <TemperatureCurrent
        unit={tempUnit}
        temperature={temperatureData.temperature}
      />
      <PrecipitationCurrent humidity={relativeHumidity / 100} />
    </>
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
