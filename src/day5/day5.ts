import { createLinesFromStartAndEndCoordinates } from "./lineCreator";

export type PuzzleInput = [number, number][];
export type Coordinate = { x: number; y: number };
export type LineStartAndEnd = readonly [Coordinate, Coordinate];
export type Line = Coordinate[];

export function convertInputToCoordinates(
  input: PuzzleInput[]
): LineStartAndEnd[] {
  return input.map(([start, end]) => {
    return [
      { x: start[0], y: start[1] },
      { x: end[0], y: end[1] },
    ];
  });
}

export function findOverlap(input: PuzzleInput[]) {
  const startAndEndCoordinates = convertInputToCoordinates(input);
  const lines = createLinesFromStartAndEndCoordinates(startAndEndCoordinates);

  const allCoordinatesWithVents: Coordinate[] = lines.flat();
  const coordinatesAndTheirOccurance: { [key: string]: number } = {};

  allCoordinatesWithVents.forEach((coordinate) => {
    const jsonCoord = JSON.stringify(coordinate);
    if (!coordinatesAndTheirOccurance[jsonCoord]) {
      coordinatesAndTheirOccurance[jsonCoord] = 1;
    } else {
      coordinatesAndTheirOccurance[jsonCoord]++;
    }
  });

  return Object.values(coordinatesAndTheirOccurance).filter(
    (occurance) => occurance > 1
  ).length;
}
