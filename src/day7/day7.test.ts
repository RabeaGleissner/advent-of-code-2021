import {
  fuelCostForDistancePart2,
  fuelExpense,
  getCheapestPosition,
  getCheapestPositionPart2,
  getFuelExpensePart2,
  startingPositions,
} from "./day7";
import input from "./day7input";

const exampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe("align the crabs - part 1", () => {
  it("counts crabs per position", () => {
    expect(startingPositions(exampleInput)).toStrictEqual({
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    });
  });

  it("calculates fuel expense to move every crab to position 2", () => {
    const startPositions = {
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    };
    const targetPosition = 2;
    expect(fuelExpense(startPositions, targetPosition)).toBe(37);
  });

  it("calculates fuel expense to move every crab to position 1", () => {
    const startPositions = {
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    };
    const targetPosition = 1;
    expect(fuelExpense(startPositions, targetPosition)).toBe(41);
  });

  it("calculates fuel expense to move every crab to position 3", () => {
    const startPositions = {
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    };
    const targetPosition = 3;
    expect(fuelExpense(startPositions, targetPosition)).toBe(39);
  });

  it("calculates cheapest position to move all crabs to", () => {
    expect(getCheapestPosition(exampleInput)).toStrictEqual({
      position: 2,
      fuelExpense: 37,
    });
  });

  it("the solution", () => {
    expect(getCheapestPosition(input)).toStrictEqual({
      position: 358,
      fuelExpense: 344138,
    });
  });
});

describe("align crabs - part 2", () => {
  it("calculates fuel cost for a distance of 9", () => {
    expect(fuelCostForDistancePart2(9)).toBe(45);
  });

  it("calculates fuel cost for a distance of 4", () => {
    expect(fuelCostForDistancePart2(4)).toBe(10);
  });

  it("calculates fuel cost for a distance of 5", () => {
    expect(fuelCostForDistancePart2(5)).toBe(15);
  });

  it("calculates fuel expense to move every crab to position 2 with new algorithm", () => {
    const startPositions = {
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    };
    const targetPosition = 2;
    expect(getFuelExpensePart2(startPositions, targetPosition)).toBe(206);
  });

  it("calculates fuel expense to move every crab to position 5 with new algorithm", () => {
    const startPositions = {
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    };
    const targetPosition = 5;
    expect(getFuelExpensePart2(startPositions, targetPosition)).toBe(168);
  });

  it("cheapest position with new algorithm (part 2)", () => {
    expect(getCheapestPositionPart2(exampleInput)).toStrictEqual({
      position: 5,
      fuelExpense: 168,
    });
  });

  it("the solution", () => {
    expect(getCheapestPositionPart2(input)).toStrictEqual({
      position: 482,
      fuelExpense: 94862124,
    });
  });
});
