import convert from "convert";
import { defaultTempUnit, defaultWindspeedUnit } from "@/contexts/WeatherUnit";

export const convertTemperature = (value, toUnit = defaultTempUnit) =>
  convert(value, defaultTempUnit).to(toUnit);

export const convertWindspeed = (value, toUnit = defaultWindspeedUnit) => {
  const adjustedValue = toUnit !== "m" ? value * 60 * 60 : value;

  return convert(adjustedValue, defaultWindspeedUnit).to(toUnit);
};
