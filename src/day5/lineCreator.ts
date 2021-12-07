import { Coordinate, Line, LineStartAndEnd } from "./day5";

export function createLinesFromStartAndEndCoordinates(
  startAndEnd: LineStartAndEnd[],
  { includeDiagonals }: { includeDiagonals: boolean }
): any {
  let lines: Line[] = [];
  startAndEnd.map(([start, end]: LineStartAndEnd) => {
    if (isHorizontal([start, end])) {
      const line = createHorizontalLine(start, end);
      lines.push(line);
    }

    if (isVertical([start, end])) {
      const line = createVerticalLine(start, end);
      lines.push(line);
    }

    if (includeDiagonals && isDiagonal([start, end])) {
      const line = createDiagonalLine(start, end);
      lines.push(line);
    }
  });
  return lines;
}

const createHorizontalLine = (start: Coordinate, end: Coordinate) => {
  const line = [];
  const [lowest, highest] = start.y < end.y ? [start, end] : [end, start];

  for (let i = lowest.y; i <= highest.y; i++) {
    line.push({ x: lowest.x, y: i });
  }
  return line;
};

const createVerticalLine = (start: Coordinate, end: Coordinate) => {
  const line = [];
  const [lowest, highest] = start.x < end.x ? [start, end] : [end, start];

  for (let i = lowest.x; i <= highest.x; i++) {
    line.push({ x: i, y: lowest.y });
  }
  return line;
};

const createDiagonalLine = (start: Coordinate, end: Coordinate) => {
  const [first, second] = start.x < end.x ? [start, end] : [end, start];
  const rangeForX: number[] = [];
  const rangeForY: number[] = [];
  for (let i = first.x; i <= second.x; i++) {
    rangeForX.push(i);
  }

  if (first.y < second.y) {
    for (let i = first.y; i <= second.y; i++) {
      rangeForY.push(i);
    }
  } else {
    for (let i = second.y; i <= first.y; i++) {
      rangeForY.unshift(i);
    }
  }

  return rangeForX.map((xCoord, index) => ({
    x: xCoord,
    y: rangeForY[index],
  }));
};

const isHorizontal = ([start, end]: LineStartAndEnd) => start.x === end.x;
const isVertical = ([start, end]: LineStartAndEnd) => start.y === end.y;
const isDiagonal = ([start, end]: LineStartAndEnd) => {
  const differenceBetweenX = start.x - end.x;
  const differenceBetweenY = start.y - end.y;
  return Math.abs(differenceBetweenX) === Math.abs(differenceBetweenY);
};
