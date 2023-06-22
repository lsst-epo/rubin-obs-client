const observatoryTZ = "America/Santiago";

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

export const formatTime = (value, locale = "en", observatoryTime = "true") => {
  return new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
    ...(observatoryTime && { timeZone: observatoryTZ }),
  }).format(value);
};
