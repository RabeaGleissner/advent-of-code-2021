interface FishPopulation {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
}

const numberOfFishPart1 = (fishSwarm: number[], days: number): number => {
  let dailyState = fishSwarm;

  for (let i = 0; i < days; i++) {
    dailyState = nextState(dailyState);
  }
  return dailyState.length;
};

const nextState = (fishSwarm: number[]): number[] => {
  let newBorns = 0;

  const nextGen = fishSwarm.map((fish) => {
    let newAge = 10000;
    if (fish === 0) {
      newAge = 6;
      newBorns++;
    } else {
      newAge = fish - 1;
    }
    return newAge;
  });
  const newFish = [...Array(newBorns).keys()].map((i) => 8);
  return [...nextGen, ...newFish];
};

const numberOfFishPart2 = (input: number[], days: number): number => {
  const population = convertToPopulation(input);

  let dailyState = population;
  for (let i = 0; i < days; i++) {
    dailyState = nextPopulation(dailyState);
  }

  return Object.values(dailyState).reduce((acc, amount) => acc + amount);
};

const convertToPopulation = (input: number[]): FishPopulation => {
  return {
    0: input.filter((fish) => fish === 0).length,
    1: input.filter((fish) => fish === 1).length,
    2: input.filter((fish) => fish === 2).length,
    3: input.filter((fish) => fish === 3).length,
    4: input.filter((fish) => fish === 4).length,
    5: input.filter((fish) => fish === 5).length,
    6: input.filter((fish) => fish === 6).length,
    7: input.filter((fish) => fish === 7).length,
    8: input.filter((fish) => fish === 8).length,
  };
};

const nextPopulation = (currentState: FishPopulation): FishPopulation => {
  return {
    0: currentState[1],
    1: currentState[2],
    2: currentState[3],
    3: currentState[4],
    4: currentState[5],
    5: currentState[6],
    6: currentState[7] + currentState[0],
    7: currentState[8],
    8: currentState[0],
  };
};

export {
  nextState,
  numberOfFishPart1,
  nextPopulation,
  convertToPopulation,
  numberOfFishPart2,
};
