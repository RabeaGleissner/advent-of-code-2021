import { Commands, findPosition } from "./day2";
import puzzleInput from "./day2input";

const exampleInput: Commands = [
  ["forward", 5],
  ["down", 5],
  ["forward", 8],
  ["up", 3],
  ["down", 8],
  ["forward", 2],
];

describe("positioning", () => {
  it("returns position", () => {
    expect(findPosition(exampleInput)).toBe(150);
  });

  it("the result", () => {
    expect(findPosition(puzzleInput)).toBe(1990000);
  });
});
