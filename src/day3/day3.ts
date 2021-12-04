export function calculatePowerConsumption(
  diagnosticReportBinaryNumbers: string[]
): number {
  const transposedReport: number[][] = [];
  diagnosticReportBinaryNumbers[0].split("").forEach((digit) => {
    transposedReport.push([]);
  });

  const dataToAnalyse = diagnosticReportBinaryNumbers.reduce(
    (acc, binaryNumber) => {
      binaryNumber.split("").forEach((digit, index) => {
        acc[index].push(+digit);
      });
      return acc;
    },
    transposedReport
  );

  const gammaRateArray = dataToAnalyse.map((column) => {
    const zerosCount = column.filter((digit) => digit === 0).length;
    const onesCount = column.filter((digit) => digit === 1).length;
    const mostCommonDigit = zerosCount > onesCount ? 0 : 1;
    return mostCommonDigit;
  });

  const epsilonRateArray = gammaRateArray.map((bit) => (bit === 1 ? 0 : 1));
  const gammaRate = gammaRateArray.join("");
  const epsilonRate = epsilonRateArray.join("");

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}
