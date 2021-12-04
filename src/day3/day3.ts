const OXYGEN_DEFAULT = 1;
const CO2_DEFAULT = 0;

interface Ratings {
  gamma: string;
  epsilon: string;
}

export function calculatePowerConsumption(
  diagnosticReportBinaryNumbers: string[]
): number {
  const reportRows = transformInitialInputTo2DArray(
    diagnosticReportBinaryNumbers
  );
  const { gamma, epsilon } = findGammaAndEpsilonRates(reportRows);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function calculateLifeSupportRating(
  diagnosticReportBinaryNumbers: string[]
): number {
  const reportRows = transformInitialInputTo2DArray(
    diagnosticReportBinaryNumbers
  );
  const reportColumns = transpose(reportRows);

  let rowsToKeepForOxygen = reportRows;
  for (let i = 0; i < reportColumns.length; i++) {
    const { zerosCount, onesCount } = countOnesAndZerosAtPosition(
      i,
      transpose(rowsToKeepForOxygen)
    );

    const mostCommonAtCurrentPosition = getDigitToKeepForOxygen(
      zerosCount,
      onesCount
    );

    rowsToKeepForOxygen = rowsToKeepForOxygen.filter(
      (column) => column[i] === mostCommonAtCurrentPosition
    );
  }

  let rowsToKeepForCo2 = reportRows;
  for (let i = 0; i < reportColumns.length; i++) {
    if (rowsToKeepForCo2.length === 1) {
      break;
    }
    const { zerosCount, onesCount } = countOnesAndZerosAtPosition(
      i,
      transpose(rowsToKeepForCo2)
    );

    const leastCommonAtCurrentPosition = getDigitToKeepForCo2(
      zerosCount,
      onesCount
    );

    rowsToKeepForCo2 = rowsToKeepForCo2.filter(
      (column) => column[i] === leastCommonAtCurrentPosition
    );
  }

  const oxygenRatingBinary = rowsToKeepForOxygen[0].join("");
  const co2RatingBinary = rowsToKeepForCo2[0].join("");

  return parseInt(oxygenRatingBinary, 2) * parseInt(co2RatingBinary, 2);
}

const transformInitialInputTo2DArray = (report: string[]): number[][] => {
  return report.map((line) =>
    line.split("").map((digit) => parseInt(digit, 10))
  );
};

const countOnesAndZerosAtPosition = (
  position: number,
  columns: number[][]
): { onesCount: number; zerosCount: number } => {
  const zerosCount = columns[position].filter((digit) => digit === 0).length;
  const onesCount = columns[position].filter((digit) => digit === 1).length;
  return { zerosCount, onesCount };
};

const getDigitToKeepForOxygen = (zerosCount: number, onesCount: number) => {
  if (zerosCount === onesCount) {
    return OXYGEN_DEFAULT;
  } else {
    return zerosCount > onesCount ? 0 : 1;
  }
};

const getDigitToKeepForCo2 = (zerosCount: number, onesCount: number) => {
  if (zerosCount === onesCount) {
    return CO2_DEFAULT;
  } else {
    return zerosCount < onesCount ? 0 : 1;
  }
};

const findGammaAndEpsilonRates = (
  diagnosticReportBinaryNumbers: number[][]
): Ratings => {
  const gammaRateArray = transpose(diagnosticReportBinaryNumbers).map(
    (column) => {
      const zerosCount = column.filter((digit) => digit === 0).length;
      const onesCount = column.filter((digit) => digit === 1).length;
      const mostCommonDigit = zerosCount > onesCount ? 0 : 1;
      return mostCommonDigit;
    }
  );

  const epsilonRateArray = gammaRateArray.map((bit) => (bit === 1 ? 0 : 1));
  const gamma = gammaRateArray.join("");
  const epsilon = epsilonRateArray.join("");

  return { gamma, epsilon };
};

const transpose = (arrayWithRows: number[][]): number[][] => {
  const arrayWithEmptyColumns: number[][] = [];
  arrayWithRows[0].forEach((digit) => {
    arrayWithEmptyColumns.push([]);
  });

  return arrayWithRows.reduce((acc, binaryNumber) => {
    binaryNumber.forEach((digit, index) => {
      acc[index].push(+digit);
    });
    return acc;
  }, arrayWithEmptyColumns);
};
