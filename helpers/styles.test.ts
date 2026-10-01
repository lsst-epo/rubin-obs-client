import { describe, it, expect } from "vitest";
import { isDarkMode } from "./styles";

describe("isDarkMode", () => {
  it("returns true when background color includes invert", () => {
    expect(isDarkMode("neutral95-invert")).toBe(true);
  });

  it("returns false when background color does not include invert", () => {
    expect(isDarkMode("neutral95")).toBe(false);
  });

  it("returns false when background color is undefined or null", () => {
    expect(isDarkMode()).toBe(false);
    expect(isDarkMode(null)).toBe(false);
  });
});
