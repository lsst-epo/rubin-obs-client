import { altitude, lat, long, timezone } from "@/lib/observatory";
import { timezoneOffset, timezoneOffsetLocal } from "@/helpers";
import {
  getMoonIllumination,
  getMoonPosition,
  getMoonTimes,
  getTimes,
} from "@/lib/suncalc";

const conversion = 180 / Math.PI;

const getAzimuth = (time) =>
  getMoonPosition(time, lat, long).azimuth * conversion + 180;

export const getLunarTimes = () => {
  const now = new Date();

  return Array.apply(null, Array(14)).map((value, i) => {
    const day = new Date();
    day.setDate(now.getDate() + i);
    const { rise, set } = getMoonTimes(day, lat, long);

    return {
      day: day.getDay(),
      rise,
      set,
      azimuthRise: rise ? getAzimuth(rise) : null,
      azimuthSet: set ? getAzimuth(set) : null,
    };
  });
};

export const getSolarTimes = () => {
  const offset = timezoneOffset(timezone);
  const localOffset = timezoneOffsetLocal(timezone);

  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  yesterday.setDate(yesterday.getDate() - 1);

  const isAfterNoon = today.getUTCHours() - offset >= 12;
  const dates = isAfterNoon ? [today, tomorrow] : [yesterday, today];

  const { sunset, night } = getTimes(dates[0], lat, long, altitude);
  const { nightEnd: dawn, sunrise } = getTimes(dates[1], lat, long, altitude);

  return dates.map((date, i) => {
    const times = i === 0 ? [sunset, night] : [dawn, sunrise];

    times.forEach((time) => {
      time.setHours(time.getHours() - localOffset);
    });

    return { date, times };
  });
};

export default function handler(req, res) {
  const lunarTimes = getLunarTimes();
  const { phase: lunarPhase } = getMoonIllumination();
  const solarTimes = getSolarTimes();

  if (!lunarTimes || !lunarPhase || !solarTimes) {
    throw new Error("An error occurred while retrieving astroweather data.");
  }

  return res.status(200).json({ lunarTimes, lunarPhase, solarTimes });
}
