import { nextState, numberOfFish } from "./day6";
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
    expect(numberOfFish([3, 4, 3, 1, 2], 80)).toBe(5934);
  });

  it("the solution for 80 days", () => {
    expect(numberOfFish(input, 80)).toBe(375482);
  });
});
