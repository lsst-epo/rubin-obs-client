import { fallbackLng } from "../i18n/settings";

const DEFAULT_SYSTEM_TIME = "America/Los_Angeles";

export const checkIfBetweenDates = (startDate: Date, endDate: Date) => {
  if (!startDate || !endDate) {
    return true;
  }

  const currentDate = new Date();
  const from = new Date(startDate);
  const to = new Date(endDate);

  return currentDate > from && currentDate < to;
};

export const mergeDateWithTime = ({
  date,
  time,
}: {
  date: Date;
  time?: Date;
}): Date => {
  if (time) {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
  }

  return date;
};

export const addTimezoneOffset = ({
  date,
  timezone,
}: {
  date: Date;
  timezone: string;
}) => {
  const utc = new Date(date);
  utc.setUTCHours(0);
  utc.setUTCMinutes(0);
  utc.setUTCSeconds(0);
  utc.setUTCMilliseconds(0);

  const [hour, minutes] = utc
    .toLocaleTimeString(fallbackLng, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone ?? DEFAULT_SYSTEM_TIME,
    })
    .split(":");
  const localHour = parseInt(hour);
  const offset = localHour < 12 ? localHour : -24 + localHour;
  const sign = Math.sign(offset) < 0 ? "-" : "+";

  const parsed: Record<string, string> = new Intl.DateTimeFormat(fallbackLng, {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone ?? DEFAULT_SYSTEM_TIME,
  })
    .formatToParts(date)
    .reduce((prev, curr) => {
      if (curr.type !== "literal") {
        prev[curr.type] = curr.value;
      }

      return prev;
    }, {});

  const dateString = [parsed.year, parsed.month, parsed.day].join("-");
  const timeString = [parsed.hour, parsed.minute, parsed.second].join(":");

  return `${dateString}T${timeString}.000${sign}${Math.abs(offset)
    .toString()
    .padStart(2, "0")}:${minutes}`;
};

export const formatStructuredDate = ({
  date,
  time,
  timezone,
}: {
  date: Date;
  time?: Date;
  timezone: string;
}) => {
  if (time) {
    return addTimezoneOffset({
      date: mergeDateWithTime({ date, time }),
      timezone,
    });
  } else {
    const parts: Record<string, string> = new Intl.DateTimeFormat(fallbackLng, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone ?? DEFAULT_SYSTEM_TIME,
    })
      .formatToParts(date)
      .reduce((prev, curr) => {
        if (curr.type !== "literal") {
          prev[curr.type] = curr.value;
        }

        return prev;
      }, {});

    return [parts.year, parts.month, parts.day].join("-");
  }
};
