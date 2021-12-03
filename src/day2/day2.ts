export function findPosition(commands: Commands): number {
  const { horizontalPos, depth } = commands.reduce(
    (acc, command) => {
      const [direction, steps] = command;
      if (direction === "forward") {
        acc.horizontalPos += steps;
      }
      if (direction === "up") {
        acc.depth -= steps;
      }
      if (direction === "down") {
        acc.depth += steps;
      }
      return acc;
    },
    {
      horizontalPos: 0,
      depth: 0,
    }
  );
  return horizontalPos * depth;
}

export type Commands = [Direction, number][];

type Direction = "down" | "up" | "forward";
