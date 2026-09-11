import { convertTemperature, convertWindspeed } from "./converters";
// °F = (°C × 1.8) + 32

describe("convertTempurature", () => {
  it("Converts Celsius to Fahrenheit correctly (10°C = 50°F)", () => {
    expect(convertTemperature(10, "fahrenheit")).toBeCloseTo(50, 2);
  });

  // it("Converts Fahrenheit to Celsius correctly (50°F = 10°C)", () => {});

  it("Does not convert the temperature when toUnit equals default unit", () => {
    expect(convertTemperature(10, "celsius")).toBe(10);
  });

  it("Converts negative values correctly", () => {
    expect(convertTemperature(-10, "fahrenheit")).toBeCloseTo(14, 2);
  });
});

describe("convertWindspeed", () => {
  it('Converts "m/s" to "NM/h" correctly', () => {
    // 5 m/s = 9.719222 NM/h
    expect(convertWindspeed(5, "NM")).toBeCloseTo(9.719, 3);
  });

  it('Converts "m/s" to "mi/h" correctly', () => {
    // 5 m/s = 11.284681 NM/h
    expect(convertWindspeed(5, "mi")).toBeCloseTo(11.185, 3);
  });

  it("Does not convert the windspeed when toUnit equals default unit", () => {
    expect(convertWindspeed(5, "m")).toBe(5);
  });

  it("It returns zero when windspeed is zero regardless of unit", () => {
    expect(convertWindspeed(0, "m")).toBe(0);
    expect(convertWindspeed(0, "NM")).toBe(0);
  });
});
