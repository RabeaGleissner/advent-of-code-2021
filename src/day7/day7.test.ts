import {
  fuelCostPart2,
  getFuelExpense,
  getCheapestPosition,
  crabsPerPosition,
} from "./day7";
import input from "./day7input";

const exampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe("align the crabs", () => {
  it("counts crabs per position", () => {
    expect(crabsPerPosition(exampleInput)).toStrictEqual({
      0: 1,
      1: 2,
      2: 3,
      4: 1,
      7: 1,
      14: 1,
      16: 1,
    });
  });

  describe("part 1", () => {
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
      expect(getFuelExpense(startPositions, targetPosition, { part: 1 })).toBe(
        37
      );
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
      expect(getFuelExpense(startPositions, targetPosition, { part: 1 })).toBe(
        41
      );
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
      expect(getFuelExpense(startPositions, targetPosition, { part: 1 })).toBe(
        39
      );
    });

    it("calculates cheapest position to move all crabs to", () => {
      expect(getCheapestPosition(exampleInput, { part: 1 })).toStrictEqual({
        position: 2,
        fuelExpense: 37,
      });
    });

    it("the solution", () => {
      expect(getCheapestPosition(input, { part: 1 })).toStrictEqual({
        position: 358,
        fuelExpense: 344138,
      });
    });
  });

  describe("part 2", () => {
    it("calculates fuel cost for a distance of 9", () => {
      expect(fuelCostPart2(5, "14")).toBe(45);
    });

    it("calculates fuel cost for a distance of 4", () => {
      expect(fuelCostPart2(1, "5")).toBe(10);
    });

    it("calculates fuel cost for a distance of 5", () => {
      expect(fuelCostPart2(0, "5")).toBe(15);
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
      expect(getFuelExpense(startPositions, targetPosition, { part: 2 })).toBe(
        206
      );
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
      expect(getFuelExpense(startPositions, targetPosition, { part: 2 })).toBe(
        168
      );
    });

    it("cheapest position with new algorithm (part 2)", () => {
      expect(getCheapestPosition(exampleInput, { part: 2 })).toStrictEqual({
        position: 5,
        fuelExpense: 168,
      });
    });

    it("the solution", () => {
      expect(getCheapestPosition(input, { part: 2 })).toStrictEqual({
        position: 482,
        fuelExpense: 94862124,
      });
    });
  });
});
