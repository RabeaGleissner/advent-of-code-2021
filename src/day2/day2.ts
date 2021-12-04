export type Commands = [Direction, number][];
type Direction = "down" | "up" | "forward";

export function findPosition(commands: Commands): number {
  const { horizontalPos, depth } = commands.reduce(
    (acc, [direction, steps]) => {
      switch (direction) {
        case "forward":
          acc.horizontalPos += steps;
          break;
        case "up":
          acc.depth -= steps;
          break;
        case "down":
          acc.depth += steps;
          break;
        default:
          break;
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

interface NavigationTracker {
  horizontalPos: number;
  depth: number;
  aim: number;
}

export function findPositionWithAim(commands: Commands): number {
  const { horizontalPos, depth } = commands.reduce(
    ({ horizontalPos, depth, aim }, [direction, steps]): NavigationTracker => {
      if (direction === "forward") {
        return {
          horizontalPos: horizontalPos + steps,
          depth: depth + aim * steps,
          aim,
        };
      }
      if (direction === "up") {
        return { horizontalPos, depth, aim: aim - steps };
      }
      if (direction === "down") {
        return { horizontalPos, depth, aim: aim + steps };
      }
      return { horizontalPos, depth, aim };
    },
    {
      horizontalPos: 0,
      depth: 0,
      aim: 0,
    }
  );
  return horizontalPos * depth;
}
