import { createLinesFromStartAndEndCoordinates } from "./lineCreator";

describe("line creator", () => {
  it("creates horizontal and vertical lines based on given start and end coordinates", () => {
    expect(
      createLinesFromStartAndEndCoordinates(
        [
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
        ],
        { includeDiagonals: true }
      )
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

  it("creates diagonal line based on given start and end coordinates", () => {
    expect(
      createLinesFromStartAndEndCoordinates(
        [
          [
            { x: 1, y: 1 },
            { x: 3, y: 3 },
          ],
          [
            { x: 9, y: 7 },
            { x: 7, y: 9 },
          ],
        ],
        { includeDiagonals: true }
      )
    ).toStrictEqual([
      [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
      [
        { x: 7, y: 9 },
        { x: 8, y: 8 },
        { x: 9, y: 7 },
      ],
    ]);
  });
});
