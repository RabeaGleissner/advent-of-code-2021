import {
  convertToPopulation,
  nextPopulation,
  nextState,
  numberOfFishPart1,
  numberOfFishPart2,
} from "./day6";
import input from "./day6input";

describe("lantern fish life", () => {
  it("sets the next state when no new fish are born", () => {
    expect(nextState([3, 4, 3, 1, 2])).toStrictEqual([2, 3, 2, 0, 1]);
  });

  it("sets the next state with new fish", () => {
    expect(
      nextState([
        0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8,
      ])
    ).toStrictEqual([
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ]);
  });

  it("calculates the number of fish after 80 days", () => {
    expect(numberOfFishPart1([3, 4, 3, 1, 2], 80)).toBe(5934);
  });

  it("the solution for 80 days", () => {
    expect(numberOfFishPart1(input, 80)).toBe(375482);
  });
});

describe("the population of lantern fish", () => {
  it("converts input to population", () => {
    const testInput = [
      0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8,
    ];

    expect(convertToPopulation(testInput)).toStrictEqual({
      0: 4,
      1: 3,
      2: 5,
      3: 3,
      4: 2,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
    });
  });

  it("finds the next population state without newborns", () => {
    const currentPopulationState = {
      0: 0,
      1: 1,
      2: 1,
      3: 2,
      4: 1,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    const nextState = {
      0: 1,
      1: 1,
      2: 2,
      3: 1,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    };
    expect(nextPopulation(currentPopulationState)).toStrictEqual(nextState);
  });

  it("finds the next population state with newborns", () => {
    const currentPopulationState = {
      0: 4,
      1: 3,
      2: 5,
      3: 3,
      4: 2,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
    };

    const nextState = {
      0: 3,
      1: 5,
      2: 3,
      3: 2,
      4: 2,
      5: 1,
      6: 5,
      7: 1,
      8: 4,
    };
    expect(nextPopulation(currentPopulationState)).toStrictEqual(nextState);
  });

  it("the solution for 80 days", () => {
    expect(numberOfFishPart2(input, 80)).toBe(375482);
  });

  it("the solution for 256 days", () => {
    expect(numberOfFishPart2(input, 256)).toBe(1689540415957);
  });
});
