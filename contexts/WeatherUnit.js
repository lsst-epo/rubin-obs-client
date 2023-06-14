import { createContext, useContext } from "react";

export const defaultUnits = {
  tempUnit: "C",
  windSpeedUnit: "m",
};

const WeatherUnitContext = createContext(defaultUnits);

export function useWeatherUnit() {
  return useContext(WeatherUnitContext);
}

export default WeatherUnitContext;
