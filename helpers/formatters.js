import { timezone } from "@/lib/observatory";

export const formatTemperature = (value, locale = "en", unit = "celsius") => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    maximumFractionDigits: 0,
  });

  return formatter
    .formatToParts(value)
    .map(({ type, value }) => {
      if (type === "unit") {
        return value.replace(/[a-z]/gi, "");
      }

      return value;
    })
    .join("");
};

export const formatPercent = (value, locale = "en") => {
  const formatter = new Intl.NumberFormat(locale, { style: "percent" });

  const parts = formatter.formatToParts(value).map(({ type, value }) => {
    if (type === "percentSign") {
      return `<span style="font-size: 50%;">${value}</span>`;
    }

    return value;
  });

  return parts.join("");
};

export const formatTime = (value, locale = "en", options = {}) => {
  const defaultOptions = { timeStyle: "short", timeZone: timezone };
  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(value);
};

export const formatDayName = (day = 0, locale = "en") => {
  const today = new Date();
  const result = new Date(today);
  const diff = day - today.getDay();

  result.setDate(today.getDate() + diff);

  return result.toLocaleDateString(locale, { weekday: "long" });
};

export const formatAngle = (angle = 0, locale = "en") =>
  new Intl.NumberFormat(locale, {
    notation: "compact",
    style: "unit",
    unit: "degree",
    unitDisplay: "narrow",
  }).format(angle);
