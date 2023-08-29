import type { Coords, Grid } from "../grid";
import { findLine } from "./find-line";

export function findDiagonalRaisingLines(grid: Grid, minLineSize: number) {
  const lines: Coords[] = [];
  const vector = { dX: 1, dY: -1 };

  let y = grid.length - 1;
  let x = minLineSize - 1;

  for (; x > 0; x--) {
    const line = findLine(grid, { x, y }, vector, minLineSize);
    if (line) lines.push(...line);
  }

  for (; y >= minLineSize - 1; y--) {
    const line = findLine(grid, { x, y }, vector, minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
