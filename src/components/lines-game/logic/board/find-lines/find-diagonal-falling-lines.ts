import type { Coords, Grid, Cell } from "../board";
import { findLine } from "./find-line";

export function findDiagonalFallingLines(
  grid: Grid<Cell>,
  minLineSize: number
) {
  const lines: Coords[] = [];

  let y = grid.length - minLineSize;
  let x = 0;

  for (; y > 0; y--) {
    const line = findLine(grid, { x, y }, [1, 1], minLineSize);
    if (line) lines.push(...line);
  }

  for (; x < minLineSize; x++) {
    const line = findLine(grid, { x, y }, [1, 1], minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
