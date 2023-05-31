import { createContext, useContext } from "react";

const defaultUnits = {
  tempUnit: "C",
  windSpeedUnit: "m",
};

const WeatherUnitContext = createContext();

export function useWeatherUnitContext() {
  return useContext(WeatherUnitContext);
}

export default WeatherUnitContext;
