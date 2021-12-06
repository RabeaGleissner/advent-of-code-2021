import { Line, LineStartAndEnd } from "./day5";

export function createLinesFromStartAndEndCoordinates(
  startAndEnd: LineStartAndEnd[]
): any {
  let lines: Line[] = [];
  startAndEnd.map(([start, end]: LineStartAndEnd) => {
    if (isHorizontal([start, end])) {
      const line = [];
      const [lowest, highest] = start.y < end.y ? [start, end] : [end, start];

      for (let i = lowest.y; i <= highest.y; i++) {
        line.push({ x: lowest.x, y: i });
      }
      lines.push(line);
    }

    if (isVertical([start, end])) {
      const line = [];
      const [lowest, highest] = start.x < end.x ? [start, end] : [end, start];

      for (let i = lowest.x; i <= highest.x; i++) {
        line.push({ x: i, y: lowest.y });
      }
      lines.push(line);
    }
  });
  return lines;
}

const isHorizontal = ([start, end]: LineStartAndEnd) => start.x === end.x;
const isVertical = ([start, end]: LineStartAndEnd) => start.y === end.y;
