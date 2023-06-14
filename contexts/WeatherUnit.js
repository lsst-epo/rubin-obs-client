import { createContext, useContext } from "react";

export const defaultUnits = {
  tempUnit: "C",
  windspeedUnit: "m",
};

const WeatherUnitContext = createContext(defaultUnits);

export function useWeatherUnit() {
  return useContext(WeatherUnitContext);
}

export default WeatherUnitContext;
