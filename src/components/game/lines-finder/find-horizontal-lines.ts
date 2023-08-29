import type { Coords, Grid } from "../grid";
import { findLine } from "./find-line";

export function findHorizontalLines(grid: Grid, minLineSize: number) {
  const lines: Coords[] = [];

  for (let y = 0; y < grid.length; y++) {
    const line = findLine(grid, { x: 0, y }, { dX: 1, dY: 0 }, minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
