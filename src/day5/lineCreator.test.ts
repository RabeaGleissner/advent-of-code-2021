import { createLinesFromStartAndEndCoordinates } from "./lineCreator";

describe("line creator", () => {
  it("creates a line based on given start and end coordinates", () => {
    expect(
      createLinesFromStartAndEndCoordinates([
        [
          { x: 1, y: 1 },
          { x: 1, y: 4 },
        ],
        [
          { x: 3, y: 5 },
          { x: 3, y: 2 },
        ],
        [
          { x: 9, y: 11 },
          { x: 8, y: 11 },
        ],
        [
          { x: 9, y: 7 },
          { x: 7, y: 7 },
        ],
        [
          { x: 0, y: 7 },
          { x: 2, y: 7 },
        ],
      ])
    ).toStrictEqual([
      [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
      ],
      [
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 3, y: 5 },
      ],
      [
        { x: 8, y: 11 },
        { x: 9, y: 11 },
      ],
      [
        { x: 7, y: 7 },
        { x: 8, y: 7 },
        { x: 9, y: 7 },
      ],
      [
        { x: 0, y: 7 },
        { x: 1, y: 7 },
        { x: 2, y: 7 },
      ],
    ]);
  });
});
