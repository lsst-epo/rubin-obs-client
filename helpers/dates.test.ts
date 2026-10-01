import { describe, it, expect } from "vitest";
import { makeDateString, makeDateObject } from "./dates";

// UTC midnight on New Year's Day. Un-normalized, a negative-offset timezone
// renders the previous day, month and year: "December 31, 2024"
const craftDate = "2025-01-01T00:00:00+00:00";

describe("makeDateString", () => {
  it("returns undefined when date is falsy", () => {
    expect(makeDateString("")).toBeUndefined();
  });

  it("normalizes the date when isCraftDate is true", () => {
    expect(makeDateString(craftDate, { isCraftDate: true })).toBe(
      "January 1, 2025"
    );
  });

  it("normalizes the date when isCraftDate is omitted", () => {
    expect(makeDateString(craftDate)).toBe("January 1, 2025");
  });

  it("does not normalize the date when isCraftDate is false", () => {
    expect(makeDateString(craftDate, { isCraftDate: false })).toBe(
      "December 31, 2024"
    );
  });

  it("shortens the month name when isShort is true", () => {
    expect(makeDateString(craftDate, { isShort: true })).toBe("Jan 1 2025");
  });

  it("does not shorten the month name when isShort is false", () => {
    expect(makeDateString(craftDate, { isShort: false })).toBe(
      "January 1, 2025"
    );
  });

  it("formats the date using the provided locale", () => {
    expect(makeDateString(craftDate, { locale: "es" })).toBe(
      "1 de enero de 2025"
    );
  });
});

describe("makeDateObject", () => {
  it("returns undefined when date is falsy", () => {
    expect(makeDateObject("")).toBeUndefined();
  });

  it("normalizes the date when isCraftDate is true", () => {
    expect(makeDateObject(craftDate, { isCraftDate: true })).toEqual({
      month: "January",
      day: "1",
      year: "2025",
    });
  });

  it("normalizes the date when isCraftDate is omitted", () => {
    expect(makeDateObject(craftDate)).toEqual({
      month: "January",
      day: "1",
      year: "2025",
    });
  });

  it("does not normalize the date when isCraftDate is false", () => {
    expect(makeDateObject(craftDate, { isCraftDate: false })).toEqual({
      month: "December",
      day: "31",
      year: "2024",
    });
  });

  it("shortens the month value when isShort is true", () => {
    expect(makeDateObject(craftDate, { isShort: true })).toEqual({
      month: "Jan",
      day: "1",
      year: "2025",
    });
  });

  it("does not shorten the month value when isShort is false", () => {
    expect(makeDateObject(craftDate, { isShort: false })).toEqual({
      month: "January",
      day: "1",
      year: "2025",
    });
  });

  it("formats the date using the provided locale", () => {
    expect(makeDateObject(craftDate, { locale: "es" })).toEqual({
      month: "enero",
      day: "1",
      year: "2025",
    });
  });
});
