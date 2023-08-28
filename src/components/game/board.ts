import { derived, writable } from "svelte/store";
import type { Ball } from "./ball";

type Coords = { x: number; y: number };
type Cell = Ball | null;

const size = 9;
export const board = writable<Cell[][]>(getClearBoard());

export const emptyCells = derived(board, ($board) => {
  const list: Coords[] = [];
  $board.forEach((row, x) =>
    row.forEach((cell, y) => {
      if (cell === null) list.push({ x, y });
    })
  );
  return list;
});

export const noEmptyCells = derived(
  emptyCells,
  ($emptyCells) => $emptyCells.length === 0
);

export const reset = () => {
  board.set(getClearBoard());
};

export const addBall = (ball: Ball, coords: Coords) => {
  board.update(($rows) => {
    $rows[coords.x][coords.y] = ball;
    return $rows;
  });
};

function getClearBoard() {
  return Array(size)
    .fill(null)
    .map((_) => Array(size).fill(null));
}
