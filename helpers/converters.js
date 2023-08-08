import convert from "convert";
import { defaultTempUnit, defaultWindspeedUnit } from "@/contexts/WeatherUnit";

export const convertTemperature = (value, toUnit = defaultTempUnit) =>
  convert(Number(value), defaultTempUnit).to(toUnit);

export const convertWindspeed = (value, toUnit = defaultWindspeedUnit) => {
  const numValue = Number(value);
  const adjustedValue = toUnit !== "m" ? numValue * 60 * 60 : numValue;

  return convert(adjustedValue, defaultWindspeedUnit).to(toUnit);
};
