import { get, writable } from "svelte/store";
import sample from "lodash/sample";
import shuffle from "lodash/shuffle";

import { reset as resetScore, add as addScore } from "./score";
import {
  type Coords,
  $grid,
  $emptyCells,
  hasBall,
  setCell,
  resetGrid,
  $activeBallCoords,
  moveActiveBall,
  removeBalls,
} from "./grid";
import { $nextBalls, updateNextBalls } from "./next-balls";
import { findLines } from "./lines-finder";
import { findPath } from "./path-finder";
import { getGridCellByCoords } from "./grid.helpers";

export const $isOver = writable(false);
export const $wrongCell = writable(false);

export const start = () => {
  $isOver.set(false);
  resetScore();
  resetGrid();
  updateNextBalls();
  addNextBallsToBoard();
};

export const nextTurn = () => {
  if (get($isOver)) return;
  addNextBallsToBoard();
};

export const gameOver = () => {
  console.info(`🔥 gameOver (game.ts)`);
  $isOver.set(true);
};

export const cellClick = (coords: Coords) => {
  $wrongCell.set(false);
  const grid = get($grid);
  const activeCoords = get($activeBallCoords);
  const cell = getGridCellByCoords(grid, coords);

  if (cell) {
    $activeBallCoords.set(coords);
  } else if (activeCoords) {
    const path = findPath(grid, activeCoords, coords);
    if (!path) return $wrongCell.set(true);

    moveActiveBall(coords);

    const lines = findLines(get($grid));
    if (lines.length) {
      removeBalls(lines);
      addScore(lines.length * 2);
    } else {
      nextTurn();
    }
  }
};

function addNextBallsToBoard() {
  const nextBalls = get($nextBalls);
  const emptyCells = shuffle(get($emptyCells));

  for (const ball of nextBalls) {
    const cell = emptyCells.shift();
    if (!cell) return gameOver();
    setCell(cell, ball);
  }

  if (emptyCells.length === 0) return gameOver();
  updateNextBalls();
}
