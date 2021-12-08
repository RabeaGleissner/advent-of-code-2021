interface CrabCountPerPosition {
  [key: string]: number;
}

const getCheapestPosition = (positions: number[]) => {
  const highestPosition = Math.max(...positions);
  const lowestPosition = Math.min(...positions);
  const positionsAndThoseInbetween = [];
  for (let i = lowestPosition; i < highestPosition; i++) {
    positionsAndThoseInbetween.push(i);
  }

  const initialPositions = startingPositions(positions);

  const positionWithFuelExpense = positionsAndThoseInbetween.reduce(
    (acc, position) => {
      const fuel = getFuelExpense(initialPositions, position);

      if (acc.fuelExpense > fuel) {
        acc.fuelExpense = fuel;
        acc.position = position;
      }
      return acc;
    },
    {
      fuelExpense: 1000000,
      position: 100000,
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
  startingPositions,
  getFuelExpense as fuelExpense,
  getCheapestPosition,
};
