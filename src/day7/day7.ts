const NUMBER_PLACEHOLDER = Number.MAX_SAFE_INTEGER;

interface CrabCountPerPosition {
  [key: string]: number;
}
const createAllPossibleSlots = (positions: number[]) => {
  const highestPosition = Math.max(...positions);
  const lowestPosition = Math.min(...positions);
  return createAllPossibleSlotsFromMinAndMax(lowestPosition, highestPosition);
};

const createAllPossibleSlotsFromMinAndMax = (
  min: number,
  max: number
): number[] => {
  const positionsAndThoseInbetween = [];
  for (let i = min; i < max; i++) {
    positionsAndThoseInbetween.push(i);
  }
  return positionsAndThoseInbetween;
};

const getCheapestPositionPart2 = (positions: number[]) => {
  const initialPositions = startingPositions(positions);

  const averagePosition = Math.round(
    positions.reduce((acc, position) => acc + position) / positions.length
  );

  const positionsToEvaluate = createAllPossibleSlotsFromMinAndMax(
    averagePosition - 1000,
    averagePosition + 1000
  );

  const positionWithFuelExpense = positionsToEvaluate.reduce(
    (acc, position) => {
      const fuel = getFuelExpensePart2(initialPositions, position);

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

const getCheapestPosition = (positions: number[]) => {
  const averagePosition = Math.round(
    positions.reduce((acc, position) => acc + position) / positions.length
  );

  const positionsToEvaluate = createAllPossibleSlotsFromMinAndMax(
    averagePosition - 1000,
    averagePosition + 1000
  );
  const initialPositions = startingPositions(positions);

  const positionWithFuelExpense = positionsToEvaluate.reduce(
    (acc, position) => {
      const fuel = getFuelExpense(initialPositions, position);

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

const getFuelExpense = (
  crabPositions: CrabCountPerPosition,
  targetPosition: number
): number => {
  let fuelExpense = 0;
  Object.keys(crabPositions).forEach((position) => {
    const distanceToTarget = Math.abs(targetPosition - parseInt(position, 10));
    fuelExpense += distanceToTarget * crabPositions[position];
  });
  return fuelExpense;
};

const getFuelExpensePart2 = (
  crabPositions: CrabCountPerPosition,
  targetPosition: number
): number => {
  let fuelExpense = 0;
  Object.keys(crabPositions).forEach((position) => {
    const distanceToTarget = Math.abs(targetPosition - parseInt(position, 10));

    const fuelCost = fuelCostForDistancePart2(distanceToTarget);

    fuelExpense += fuelCost * crabPositions[position];
  });
  return fuelExpense;
};

const fuelCostForDistancePart2 = (distance: number): number => {
  let fuel = 0;
  for (let i = 0; i < distance; i++) {
    fuel += i + 1;
  }
  return fuel;
};

const startingPositions = (
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

export {
  getFuelExpensePart2,
  fuelCostForDistancePart2,
  startingPositions,
  getFuelExpense as fuelExpense,
  getCheapestPosition,
  getCheapestPositionPart2,
};
