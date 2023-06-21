import { createContext, useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";

export const defaultTempUnit = "celsius";
export const defaultWindspeedUnit = "m";

export const defaultUnits = {
  tempUnit: defaultTempUnit,
  windspeedUnit: defaultWindspeedUnit,
};

const WeatherUnitContext = createContext();

const unitReducer = (state, action) => {
  console.log(state, action);
  const { type } = action;

  switch (type) {
    case "fahrenheit":
      return { ...state, tempUnit: "fahrenheit" };
    case "celsius":
      return { ...state, tempUnit: "celsius" };
    case "NM":
      return { ...state, windspeedUnit: "NM" };
    case "mi":
      return { ...state, windspeedUnit: "mi" };
    case "m":
      return { ...state, windspeedUnit: "m" };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const WeatherUnitProvider = ({ children }) => {
  const {
    i18n: { language = "en" },
  } = useTranslation();
  const [state, dispatch] = useReducer(unitReducer, {
    tempUnit: language === "en" ? "fahrenheit" : defaultUnits.tempUnit,
    windspeedUnit: language === "en" ? "NM" : defaultUnits.windspeedUnit,
  });

  return (
    <WeatherUnitContext.Provider value={[state, dispatch]}>
      {children}
    </WeatherUnitContext.Provider>
  );
};

export function useWeatherUnit() {
  const context = useContext(WeatherUnitContext);

  if (context === undefined) {
    throw new Error("useWeatherUnit must be used within a WeatherUnitProvider");
  }

  return context;
}

export default WeatherUnitContext;
