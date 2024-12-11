import { fallbackLng } from "@/lib/i18n/settings";

const normalizeCraftDate = (date: Date) => {
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
};

interface DateStringOptions {
  locale?: string;
  isShort?: boolean;
  isCraftDate?: boolean;
}

export const makeDateString = (
  date: string,
  options: DateStringOptions = {}
) => {
  const { isShort = false, isCraftDate = true, locale = fallbackLng } = options;
  const newDate = new Date(date);

  /**
   * Craft dates are stored in UTC with the timezone applied as an hours offset
   * The user's timezone offset needs to be removed to restore the original date
   *
   * https://craftcms.com/docs/4.x/time-fields.html#converting-from-a-date-field
   */
  if (isCraftDate) {
    normalizeCraftDate(newDate);
  }
  const localeOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: isShort ? "short" : "long",
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, localeOptions);
  isShort && (dateString = dateString.replace(",", ""));

  return dateString;
};

export const makeDateObject = (
  date: string,
  options: DateStringOptions = {}
): Record<string, string> | undefined => {
  if (!date) return;
  const { isShort = false, isCraftDate = true, locale = fallbackLng } = options;
  const newDate = new Date(date);

  /**
   * Craft dates are stored in UTC with the timezone applied as an hours offset
   * The user's timezone offset needs to be removed to restore the original date
   *
   * https://craftcms.com/docs/4.x/time-fields.html#converting-from-a-date-field
   */
  if (isCraftDate) {
    normalizeCraftDate(newDate);
  }

  const localeOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: isShort ? "short" : "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, localeOptions)
    .formatToParts(newDate)
    .filter(({ type }) => type !== "literal")
    .reduce((prev, { type, value }) => {
      prev[type] = value;

      return prev;
    }, {});
};
