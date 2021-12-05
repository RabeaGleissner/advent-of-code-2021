export function calculateWinningScore(
  draws: number[],
  boards: number[][][]
): number {
  const { winningDraw, unmarkedPositions } = findWinningBoardGameState(
    draws,
    boards
  );

  return sum(unmarkedPositions) * winningDraw;
}

export function findWinningBoardGameState(
  draws: number[],
  boards: number[][][]
): {
  winningDraw: number;
  unmarkedPositions: number[];
  winningDrawIndex: number;
} {
  const allGameStates = boards.map((board) =>
    gameStateForWholeBoard(draws, board)
  );

  const winningBoardGameState = allGameStates.reduce((acc, gameState) => {
    if (gameState.winningDrawIndex < acc.winningDrawIndex) {
      return gameState;
    } else {
      return acc;
    }
  }, allGameStates[0]);

  return winningBoardGameState;
}

export function gameStateForWholeBoard(
  draws: number[],
  boardRows: number[][]
): {
  winningDraw: number;
  unmarkedPositions: number[];
  winningDrawIndex: number;
} {
  const boardColumns = transpose(boardRows);

  const horizontalState = gameStateForOneDirection(draws, boardRows);

  const drawsUpToWinningDraw = draws.slice(0, horizontalState.winningDrawIndex);

  const verticalState = gameStateForOneDirection(
    drawsUpToWinningDraw,
    boardColumns
  );

  if (horizontalState.winningDrawIndex < verticalState.winningDrawIndex) {
    return horizontalState;
  } else {
    return verticalState;
  }
}

const sum = (positions: number[]) =>
  positions.reduce((acc: number, position: number) => acc + position);

export function gameStateForOneDirection(
  draws: number[],
  board: number[][]
): {
  winningDraw: number;
  unmarkedPositions: number[];
  winningDrawIndex: number;
} {
  const DEFAULT_WINNING_DRAW = 1000000;
  let unmarkedLines = board;
  let winningDraw: number = DEFAULT_WINNING_DRAW;
  for (let i = 0; i < draws.length; i++) {
    unmarkedLines = unmarkedLines.map((line) =>
      line.filter((position) => position !== draws[i])
    );

    if (unmarkedLines.some((positions) => positions.length === 0)) {
      winningDraw = draws[i];
      break;
    }
  }

  const indexOfWinningDraw = draws.indexOf(winningDraw!);

  return {
    winningDraw,
    unmarkedPositions: unmarkedLines.flat(),
    winningDrawIndex:
      indexOfWinningDraw === -1 ? DEFAULT_WINNING_DRAW : indexOfWinningDraw,
  };
}

export function transformInputTo2DArray(input: string[]): number[][] {
  return input.map((row) =>
    row
      .split(" ")
      .filter((element) => element !== "")
      .map((number) => parseInt(number, 10))
  );
}

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
