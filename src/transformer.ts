const transpose = (arrayWithRows: number[][]): number[][] => {
  const arrayWithEmptyColumns: number[][] = [];
  arrayWithRows[0].forEach((digit) => {
    arrayWithEmptyColumns.push([]);
  });

  return arrayWithRows.reduce((acc, binaryNumber) => {
    binaryNumber.forEach((digit, index) => {
      acc[index].push(digit);
    });
    return acc;
  }, arrayWithEmptyColumns);
};

export { transpose };
