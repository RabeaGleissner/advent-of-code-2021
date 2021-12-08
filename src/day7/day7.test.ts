import { fuelExpense, getCheapestPosition, startingPositions } from "./day7";
import input from "./day7input";

describe("align the crabs", () => {
  const exampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
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

  xit("the solution", () => {
    expect(getCheapestPosition(input)).toBe({
      position: 358,
      fuelExpense: 344138,
    });
  });
});
