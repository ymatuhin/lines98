import type { Coords, Grid } from "../grid";
import { findLine } from "./find-line";

export function findDiagonalFallingLines(grid: Grid, minLineSize: number) {
  const lines: Coords[] = [];
  const vector = { dX: 1, dY: 1 };
  const maxPosition = grid.length - minLineSize + 1;

  let y = maxPosition;
  let x = 0;

  for (; y > 0; y--) {
    const line = findLine(grid, { x, y }, vector, minLineSize);
    if (line) lines.push(...line);
  }

  for (; x <= maxPosition; x++) {
    const line = findLine(grid, { x, y }, vector, minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
