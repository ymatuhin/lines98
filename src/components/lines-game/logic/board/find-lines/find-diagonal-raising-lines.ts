import type { Coords, Grid, Cell } from "../board";
import { findLine } from "./find-line";

export function findDiagonalRaisingLines(
  grid: Grid<Cell>,
  minLineSize: number
) {
  const lines: Coords[] = [];

  let y = grid.length - 1;
  let x = minLineSize - 1;

  for (; x > 0; x--) {
    const line = findLine(grid, { x, y }, [1, -1], minLineSize);
    if (line) lines.push(...line);
  }

  for (; y >= minLineSize - 1; y--) {
    const line = findLine(grid, { x, y }, [1, -1], minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
