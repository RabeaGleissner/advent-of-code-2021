const numberOfFish = (fishSwarm: number[], days: number): number => {
  let dailyUpdate = fishSwarm;

  for (let i = 0; i < days; i++) {
    dailyUpdate = nextState(dailyUpdate);
  }
  return dailyUpdate.length;
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

export { nextState, numberOfFish };
