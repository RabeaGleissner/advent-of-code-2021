interface GameState {
  winningDraw: number;
  unmarkedPositions: number[];
  winningDrawIndex: number;
}

export function calculateScoreForLastWinningBoard(
  draws: number[],
  boards: number[][][]
): number {
  const { winningDraw, unmarkedPositions } = findLastWinningBoardGameState(
    draws,
    boards
  );

  return sum(unmarkedPositions) * winningDraw;
}

export function calculateScoreForFirstWinningBoard(
  draws: number[],
  boards: number[][][]
): number {
  const { winningDraw, unmarkedPositions } = findFirstWinningBoardGameState(
    draws,
    boards
  );

  return sum(unmarkedPositions) * winningDraw;
}

export function findFirstWinningBoardGameState(
  draws: number[],
  boards: number[][][]
): GameState {
  const allGameStates = allGameStatesForManyBoards(draws, boards);
  return allGameStates.reduce((acc, gameState) => {
    if (gameState.winningDrawIndex < acc.winningDrawIndex) {
      return gameState;
    } else {
      return acc;
    }
  }, allGameStates[0]);
}

export function findLastWinningBoardGameState(
  draws: number[],
  boards: number[][][]
): GameState {
  const allGameStates = allGameStatesForManyBoards(draws, boards);
  return allGameStates.reduce((acc, gameState) => {
    if (gameState.winningDrawIndex > acc.winningDrawIndex) {
      return gameState;
    } else {
      return acc;
    }
  }, allGameStates[0]);
}

const allGameStatesForManyBoards = (
  draws: number[],
  boards: number[][][]
): GameState[] => boards.map((board) => gameStateForBoard(draws, board));

export function gameStateForBoard(
  draws: number[],
  boardRows: number[][]
): GameState {
  const horizontalState = gameStateForOneDirection(draws, boardRows);
  const drawsUpToWinningDraw = draws.slice(0, horizontalState.winningDrawIndex);

  const boardColumns = transpose(boardRows);
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
): GameState {
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
