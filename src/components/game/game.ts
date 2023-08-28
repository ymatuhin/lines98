import { get, writable } from "svelte/store";
import sample from "lodash/sample";

import { reset as resetScore, add as addScore } from "./score";
import {
  emptyCells,
  reset as resetBoard,
  addBall,
  noEmptyCells,
} from "./board";
import { nextBalls, update as updateNextBalls } from "./next-balls";

const isOver = writable(false);

export const start = () => {
  isOver.set(false);
  resetScore();
  resetBoard();
  addNextBallsToBoard();
};

export const skip = () => {
  if (get(isOver)) return;
  addScore(5);
  addNextBallsToBoard();
};

export const gameOver = () => {
  console.info(`🔥 gameOver (game.ts)`);
  isOver.set(true);
};

export const addNextBallsToBoard = () => {
  for (const ball of get(nextBalls)) {
    if (get(noEmptyCells)) return gameOver();

    const emptyCell = sample(get(emptyCells))!;
    addBall(ball, emptyCell);
  }

  updateNextBalls();
  if (get(noEmptyCells)) return gameOver();
};

start();
