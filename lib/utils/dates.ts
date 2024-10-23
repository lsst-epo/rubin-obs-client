import { fallbackLng } from "@/lib/i18n/settings";

export const makeDateString = (
  date: string,
  locale = fallbackLng,
  isShort = false
) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: `${isShort ? "short" : "long"}`,
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, options);
  isShort && (dateString = dateString.replace(",", ""));
  return dateString;
};
