<<<<<<< HEAD
import Loader from "@/components/atomic/Loader";
import PrecipitationCurrent from "@/components/widgets/CurrentData/patterns/Precipitation";
import TemperatureCurrent from "@/components/widgets/CurrentData/patterns/Temperature";
=======
import WidgetPreview from "@/components/layout/WidgetPreview";
import TemperatureCurrent from "@/components/widgets/TemperatureCurrent";
>>>>>>> ebb054c ([F] SummitData provider)
import { useSummitData } from "@/contexts/SummitData";
import { defaultUnits, useWeatherUnit } from "@/contexts/WeatherUnit";
import convert from "convert";

const Weather = () => {
  const { tempUnit, windspeedUnit } = useWeatherUnit();
<<<<<<< HEAD
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
=======
  const { data, loading } = useSummitData();

  if (loading || !data) return null;

  console.log({ data });

  const {
    temperature0: { _value: currentTemperature },
  } = data;

  const temperatureData = { currentTemperature };

  if ({ tempUnit, windspeedUnit } !== defaultUnits) {
>>>>>>> ebb054c ([F] SummitData provider)
    Object.entries(temperatureData).forEach(([key, value]) => {
      temperatureData[key] = convert(value, defaultUnits.tempUnit).to(tempUnit);
    });
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> ebb054c ([F] SummitData provider)
  );
};

Weather.displayName = "Dynamic.Weather";

export default Weather;
