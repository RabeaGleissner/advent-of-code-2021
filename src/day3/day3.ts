const OXYGEN_DEFAULT = 1;
const CO2_DEFAULT = 0;
interface Ratings {
  gamma: string;
  epsilon: string;
}

export function calculatePowerConsumption(
  diagnosticReportBinaryNumbers: string[]
): number {
  const { gamma, epsilon } = findGammaAndEpsilonRates(
    diagnosticReportBinaryNumbers
  );
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function calculateLifeSupportRating(
  diagnosticReportBinaryNumbers: string[]
): number {
  // const { gamma: mostCommonBinary, epsilon: leastCommonBinary } =
  // findGammaAndEpsilonRates(diagnosticReportBinaryNumbers);
  const reportRows = diagnosticReportBinaryNumbers.map((line) =>
    line.split("").map((digit) => parseInt(digit, 10))
  );
  const reportColumns = transposeReport(diagnosticReportBinaryNumbers);

  let updatingRowsForOxygen = reportRows;
  for (let i = 0; i < reportColumns.length; i++) {
    const { zerosCount, onesCount } = countOnesAndZerosAtPosition(
      i,
      transposeReportWithNumbers(updatingRowsForOxygen)
    );

    const mostCommonAtCurrentPosition = getMostCommonDigitForOxygen(
      zerosCount,
      onesCount
    );

    updatingRowsForOxygen = updatingRowsForOxygen.filter(
      (column) => column[i] === mostCommonAtCurrentPosition
    );
  }

  let updatingRowsForCo2 = reportRows;
  for (let i = 0; i < reportColumns.length; i++) {
    if (updatingRowsForCo2.length === 1) {
      break;
    }
    const { zerosCount, onesCount } = countOnesAndZerosAtPosition(
      i,
      transposeReportWithNumbers(updatingRowsForCo2)
    );

    const leastCommonAtCurrentPosition = getDigitToKeepForCo2(
      zerosCount,
      onesCount
    );

    updatingRowsForCo2 = updatingRowsForCo2.filter(
      (column) => column[i] === leastCommonAtCurrentPosition
    );
  }

  const oxygenRatingBinary = updatingRowsForOxygen[0].join("");
  const co2RatingBinary = updatingRowsForCo2[0].join("");

  return parseInt(oxygenRatingBinary, 2) * parseInt(co2RatingBinary, 2);
}

const countOnesAndZerosAtPosition = (
  position: number,
  transposedReport: number[][]
) => {
  const zerosCount = transposedReport[position].filter(
    (digit) => digit === 0
  ).length;
  const onesCount = transposedReport[position].filter(
    (digit) => digit === 1
  ).length;
  return { zerosCount, onesCount };
};

const getMostCommonDigitForOxygen = (zerosCount: number, onesCount: number) => {
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
  diagnosticReportBinaryNumbers: string[]
): Ratings => {
  const gammaRateArray = transposeReport(diagnosticReportBinaryNumbers).map(
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

const transposeReportWithNumbers = (report: number[][]): number[][] => {
  const transposedReport: number[][] = [];
  report[0].forEach((digit) => {
    transposedReport.push([]);
  });

  return report.reduce((acc, binaryNumber) => {
    binaryNumber.forEach((digit, index) => {
      acc[index].push(+digit);
    });
    return acc;
  }, transposedReport);
};

const transposeReport = (report: string[]): number[][] => {
  const transposedReport: number[][] = [];
  report[0].split("").forEach((digit) => {
    transposedReport.push([]);
  });

  return report.reduce((acc, binaryNumber) => {
    binaryNumber.split("").forEach((digit, index) => {
      acc[index].push(+digit);
    });
    return acc;
  }, transposedReport);
};
