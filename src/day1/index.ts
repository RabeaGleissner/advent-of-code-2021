export function counter(depths: number[]): number {
  return depths.reduce((counter, currentDepth, currentIndex) => {
    if (depths[currentIndex - 1] < currentDepth) {
      counter += 1;
    }
    return counter;
  }, 0);
}

export function threeMeasurementCounter(depths: number[]): number {
  const [firstDepth, secondDepth, thirdDepth] = depths;
  const initialWindow = firstDepth + secondDepth + thirdDepth;

  return depths.reduce(
    ({ previousWindow, count }, currentDepth, currentIndex) => {
      const currentWindow =
        currentDepth + depths[currentIndex + 1] + depths[currentIndex + 2];
      if (previousWindow < currentWindow) {
        count += 1;
      }

      return { previousWindow: currentWindow, count };
    },
    { previousWindow: initialWindow, count: 0 }
  ).count;
}
