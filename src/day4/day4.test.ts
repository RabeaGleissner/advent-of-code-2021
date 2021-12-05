import {
  gameStateForWholeBoard,
  gameStateForOneDirection,
  transformInputTo2DArray,
  findFirstWinningBoardGameState,
  calculateScoreForFirstWinningBoard,
  findLastWinningBoardGameState,
  calculateScoreForLastWinningBoard,
} from "./day4";

import { boards, draws } from "./day4input";

const exampleDraws = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];
const exampleBoard = [
  "14 21 17 24  4",
  "10 16 15  9 19",
  "18  8 23 26 20",
  "22 11 13  6  5",
  "2  0 12  3  7",
];
const secondExampleBoard = [
  "22 13 17 11  0",
  " 8  2 23  4 24",
  "21  9 14 16  7",
  " 6 10  3 18  5",
  " 1 12 20 15 19",
];
const thirdExampleBoard = [
  "  3 15  0  2 22",
  "  9 18 13 17  5",
  " 19  8  7 25 23",
  " 20 11 10 24  4",
  " 14 21 16 12  6",
];

const exampleBoards = [exampleBoard, secondExampleBoard, thirdExampleBoard];

describe("calculate bingo score", () => {
  it("gets unmarked positions and winning draw for one direction", () => {
    const transformedInput = transformInputTo2DArray(exampleBoard);

    expect(
      gameStateForOneDirection(exampleDraws, transformedInput)
    ).toStrictEqual({
      winningDraw: 24,
      unmarkedPositions: [10, 16, 15, 19, 18, 8, 26, 20, 22, 13, 6, 12, 3],
      winningDrawIndex: 11,
    });
  });

  it("gets unmarked positions and winning draw for the whole board", () => {
    const transformedInput = transformInputTo2DArray(exampleBoard);
    expect(
      gameStateForWholeBoard(exampleDraws, transformedInput)
    ).toStrictEqual({
      winningDraw: 24,
      unmarkedPositions: [10, 16, 15, 19, 18, 8, 26, 20, 22, 13, 6, 12, 3],
      winningDrawIndex: 11,
    });
  });

  it("gets unmarked positions and winning draw for the winning board out of many", () => {
    const transformedInput = exampleBoards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(
      findFirstWinningBoardGameState(exampleDraws, transformedInput)
    ).toStrictEqual({
      winningDraw: 24,
      unmarkedPositions: [10, 16, 15, 19, 18, 8, 26, 20, 22, 13, 6, 12, 3],
      winningDrawIndex: 11,
    });
  });

  it("calculates the winning score", () => {
    const transformedInput = exampleBoards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(
      calculateScoreForFirstWinningBoard(exampleDraws, transformedInput)
    ).toBe(4512);
  });

  it("the solution for part 1", () => {
    const transformedInput = boards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(calculateScoreForFirstWinningBoard(draws, transformedInput)).toBe(
      2496
    );
  });

  it("get state for board that wins last", () => {
    const transformedInput = exampleBoards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(
      findLastWinningBoardGameState(exampleDraws, transformedInput)
    ).toStrictEqual({
      winningDraw: 13,
      unmarkedPositions: [3, 19, 20, 15, 18, 8, 25, 12, 22, 6],
      winningDrawIndex: 14,
    });
  });

  it("calculates the last winning score", () => {
    const transformedInput = exampleBoards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(
      calculateScoreForLastWinningBoard(exampleDraws, transformedInput)
    ).toBe(1924);
  });

  it("the solution for part 2", () => {
    const transformedInput = boards.map((board) =>
      transformInputTo2DArray(board)
    );
    expect(calculateScoreForLastWinningBoard(draws, transformedInput)).toBe(
      25925
    );
  });
});
