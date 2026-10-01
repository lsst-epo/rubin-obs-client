import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatTemperature,
  formatPercent,
  formatTime,
  formatDayName,
  formatAngle,
  formatLargeNumber,
} from "./formatters";

// Noon UTC in January, when Santiago observes daylight time (UTC-3)
const noonUTC = new Date("2025-01-01T12:00:00Z");

describe("formatTemperature", () => {
  it("strips the unit letter from the formatted temperature", () => {
    // Intl formats this as "10°C"
    expect(formatTemperature(10)).toBe("10°");
  });

  it("formats fahrenheit when unit is fahrenheit", () => {
    expect(formatTemperature(50, "en", "fahrenheit")).toBe("50°");
  });

  it("rounds to whole degrees", () => {
    expect(formatTemperature(10.6)).toBe("11°");
  });

  it("formats using the provided locale", () => {
    expect(formatTemperature(10, "es")).toBe("10 °");
  });
});

describe("formatPercent", () => {
  it("wraps the percent sign in a half-size span", () => {
    expect(formatPercent(0.5)).toBe('50<span style="font-size: 50%;">%</span>');
  });

  it("formats using the provided locale", () => {
    // Spanish separates the number and percent sign with a no-break space
    expect(formatPercent(0.5, "es")).toBe(
      '50\u00a0<span style="font-size: 50%;">%</span>'
    );
  });
});

describe("formatTime", () => {
  it("formats the time in the observatory timezone by default", () => {
    expect(formatTime(noonUTC)).toBe("9:00 AM");
  });

  it("overrides default options with provided options", () => {
    expect(formatTime(noonUTC, "en", { timeZone: "UTC" })).toBe("12:00 PM");
  });

  it("formats using the provided locale", () => {
    expect(formatTime(noonUTC, "es")).toBe("9:00");
  });
});

describe("formatDayName", () => {
  beforeEach(() => {
    // Wednesday, January 1, 2025 in Phoenix
    vi.useFakeTimers().setSystemTime(noonUTC);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns Sunday by default", () => {
    expect(formatDayName()).toBe("Sunday");
  });

  it("returns the weekday name for the given day index", () => {
    expect(formatDayName(5)).toBe("Friday");
  });

  it("formats using the provided locale", () => {
    expect(formatDayName(0, "es")).toBe("domingo");
  });
});

describe("formatAngle", () => {
  it("formats degrees with a narrow unit", () => {
    expect(formatAngle(45)).toBe("45°");
  });

  it("compacts large angles", () => {
    expect(formatAngle(1500)).toBe("1.5K°");
  });
});

describe("formatLargeNumber", () => {
  it("compacts numbers without limiting significant digits when 9999 or less", () => {
    expect(formatLargeNumber(1234)).toBe("1.2K");
  });

  it("limits to two significant digits when greater than 9999", () => {
    // Default compact notation would render "123K"
    expect(formatLargeNumber(123456)).toBe("120K");
  });
});
