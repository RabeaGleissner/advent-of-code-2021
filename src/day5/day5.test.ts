import { convertInputToCoordinates, findOverlap, PuzzleInput } from "./day5";
import actualPuzzleInput from "./day5input";

describe("Hydrothermal vent overlap calculation", () => {
  const exampleInput: PuzzleInput[] = [
    [
      [0, 9],
      [5, 9],
    ],
    [
      [8, 0],
      [0, 8],
    ],
    [
      [9, 4],
      [3, 4],
    ],
    [
      [2, 2],
      [2, 1],
    ],
    [
      [7, 0],
      [7, 4],
    ],
    [
      [6, 4],
      [2, 0],
    ],
    [
      [0, 9],
      [2, 9],
    ],
    [
      [3, 4],
      [1, 4],
    ],
    [
      [0, 0],
      [8, 8],
    ],
    [
      [5, 5],
      [8, 2],
    ],
  ];

  it("converts puzzle input to coordinate array ", () => {
    expect(
      convertInputToCoordinates([
        [
          [1, 1],
          [1, 3],
        ],
        [
          [9, 7],
          [7, 7],
        ],
      ])
    ).toStrictEqual([
      [
        { x: 1, y: 1 },
        { x: 1, y: 3 },
      ],
      [
        { x: 9, y: 7 },
        { x: 7, y: 7 },
      ],
    ]);
  });

  it("finds coordinates where lines overlap", () => {
    expect(findOverlap(exampleInput, { includeDiagonals: false })).toBe(5);
  });

  it("finds coordinates where lines overlap only once", () => {
    expect(
      findOverlap(
        [
          [
            [9, 4],
            [3, 4],
          ],
          [
            [4, 4],
            [3, 4],
          ],
          [
            [4, 4],
            [4, 4],
          ],
        ],
        { includeDiagonals: false }
      )
    ).toBe(2);
  });

  it("the solution for part 1 (without diagonals)", () => {
    expect(findOverlap(actualPuzzleInput, { includeDiagonals: false })).toBe(
      5690
    );
  });

  it("the solution for part 2 (with diagonals)", () => {
    expect(findOverlap(actualPuzzleInput, { includeDiagonals: true })).toBe(
      17741
    );
  });
});
