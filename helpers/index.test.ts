import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  capitalize,
  hasImage,
  isAbsoluteUrl,
  isInternalUrl,
  fileSize,
  wait,
  timezoneOffset,
  timezoneOffsetLocal,
  arrayRange,
} from "./index";

// `.env` is gitignored, so the real env module would fail validation in CI.
vi.mock("@/env", () => ({
  env: { NEXT_PUBLIC_BASE_URL: "https://rubinobservatory.org" },
}));

describe("capitalize", () => {
  it("capitalizes the first character", () => {
    expect(capitalize("rubin")).toBe("Rubin");
  });

  it("returns an empty string when value is not a string", () => {
    expect(capitalize(42)).toBe("");
  });

  it("capitalizes using the provided locale", () => {
    expect(capitalize("ñandú", "es")).toBe("Ñandú");
  });
});

describe("hasImage", () => {
  it("returns true when the first image has a url", () => {
    expect(hasImage([{ url: "https://example.com/image.jpg" }])).toBe(true);
  });

  it("returns false when the array is empty or missing", () => {
    expect(hasImage([])).toBe(false);
    expect(hasImage(undefined)).toBe(false);
  });

  it("returns false when the first image has no url", () => {
    expect(hasImage([{}])).toBe(false);
  });
});

describe("isAbsoluteUrl", () => {
  it("returns true for http and https urls", () => {
    expect(isAbsoluteUrl("http://example.com")).toBe(true);
    expect(isAbsoluteUrl("https://example.com")).toBe(true);
  });

  it("returns false for relative urls", () => {
    expect(isAbsoluteUrl("/about")).toBe(false);
  });
});

describe("isInternalUrl", () => {
  it("returns true for relative urls", () => {
    expect(isInternalUrl("/about")).toBe(true);
  });

  it("returns true when origin matches the base url", () => {
    expect(isInternalUrl("https://rubinobservatory.org/about")).toBe(true);
  });

  it("returns false when origin differs", () => {
    expect(isInternalUrl("https://example.com/about")).toBe(false);
  });
});

describe("fileSize", () => {
  it("formats bytes with the matching unit", () => {
    expect(fileSize(512)).toBe("512 B");
    expect(fileSize(1536)).toBe("1.5 kB");
    expect(fileSize(1048576)).toBe("1 MB");
  });
});

describe("wait", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves after the given number of seconds", async () => {
    const resolved = vi.fn();
    wait(2).then(resolved);

    await vi.advanceTimersByTimeAsync(1999);
    expect(resolved).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(2); // 2001ms will have passed
    expect(resolved).toHaveBeenCalled();
  });
});

describe("timezoneOffset", () => {
  beforeEach(() => {
    // January, when Santiago observes daylight time (UTC-3)
    vi.useFakeTimers().setSystemTime(new Date("2025-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the hours behind UTC for a timezone", () => {
    expect(timezoneOffset("America/Santiago")).toBe(3);
  });
});

describe("timezoneOffsetLocal", () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date("2025-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the difference between the local and given timezone", () => {
    // Phoenix (UTC-7) minus Santiago (UTC-3)
    expect(timezoneOffsetLocal("America/Santiago")).toBe(4);
  });
});

describe("arrayRange", () => {
  it("builds an inclusive range by step", () => {
    expect(arrayRange(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it("stops before exceeding stop when step does not divide evenly", () => {
    expect(arrayRange(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });
});
