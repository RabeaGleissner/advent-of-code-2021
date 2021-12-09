const NUMBER_PLACEHOLDER = Number.MAX_SAFE_INTEGER;

interface CrabCountPerPosition {
  [key: string]: number;
}

const getCheapestPosition = (
  positions: number[],
  { part }: { part: number }
) => {
  const averagePosition = Math.round(
    positions.reduce((acc, position) => acc + position) / positions.length
  );

  const positionsToEvaluate = createPositionOptionsFromMinAndMax(
    averagePosition - 1000,
    averagePosition + 1000
  );
  const initialPositions = crabsPerPosition(positions);

  const positionWithFuelExpense = positionsToEvaluate.reduce(
    (acc, position) => {
      const fuel = getFuelExpense(initialPositions, position, { part });

      if (acc.fuelExpense > fuel) {
        acc.fuelExpense = fuel;
        acc.position = position;
      }
      return acc;
    },
    {
      fuelExpense: NUMBER_PLACEHOLDER,
      position: NUMBER_PLACEHOLDER,
    }
  );
  return positionWithFuelExpense;
};

const createPositionOptionsFromMinAndMax = (
  min: number,
  max: number
): number[] => {
  const positionsAndThoseInbetween = [];
  for (let i = min; i < max; i++) {
    positionsAndThoseInbetween.push(i);
  }
  return positionsAndThoseInbetween;
};

const getFuelExpense = (
  crabPositions: CrabCountPerPosition,
  targetPosition: number,
  { part }: { part: number }
): number => {
  let fuelExpense = 0;
  Object.keys(crabPositions).forEach((position) => {
    const fuelCost =
      part === 1
        ? fuelCostPart1(targetPosition, position)
        : fuelCostPart2(targetPosition, position);
    fuelExpense += fuelCost * crabPositions[position];
  });
  return fuelExpense;
};

const fuelCostPart1 = (
  targetPosition: number,
  currentPosition: string
): number => {
  return Math.abs(targetPosition - parseInt(currentPosition, 10));
};

const fuelCostPart2 = (
  targetPosition: number,
  currentPosition: string
): number => {
  const distance = Math.abs(targetPosition - parseInt(currentPosition, 10));
  let fuel = 0;
  for (let i = 0; i < distance; i++) {
    fuel += i + 1;
  }
  return fuel;
};

const crabsPerPosition = (
  exampleInput: number[]
): { [key: string]: number } => {
  return exampleInput.reduce(
    (acc: CrabCountPerPosition, crabPosition: number) => {
      if (acc[crabPosition]) {
        acc[crabPosition]++;
      } else {
        acc[crabPosition] = 1;
      }
      return acc;
    },
    {}
  );
};

export { fuelCostPart2, crabsPerPosition, getFuelExpense, getCheapestPosition };
