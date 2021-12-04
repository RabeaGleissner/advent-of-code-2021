import { calculatePowerConsumption } from "./day3";
import actualData from "./day3input";

const exampleInput: string[] = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

describe("Power consumption", () => {
  it("calculates the power consumption based on the diagnostics report", () => {
    expect(calculatePowerConsumption(exampleInput)).toBe(198);
  });

  it("the solution", () => {
    expect(calculatePowerConsumption(actualData)).toBe(3923414);
  });
});
