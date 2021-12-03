import { counter, threeMeasurementCounter } from "./index";
import givenDepths from "./input";

const exampleDepthsData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe("depth increase counter", () => {
  it("counts the number of times the depth is increased", () => {
    expect(counter(exampleDepthsData)).toBe(7);
  });

  it("the result", () => {
    expect(counter(givenDepths)).toBe(1448);
  });
});

describe("three measurement sliding window counter", () => {
  it("compares the number of increases for three measurements at a time", () => {
    expect(threeMeasurementCounter(exampleDepthsData)).toBe(5);
  });

  it("the result", () => {
    expect(threeMeasurementCounter(givenDepths)).toBe(1471);
  });
});
