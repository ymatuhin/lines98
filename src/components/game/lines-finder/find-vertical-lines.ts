import type { Coords, Grid } from "../grid";
import { findLine } from "./find-line";

export function findVerticalLines(grid: Grid, minLineSize: number) {
  const lines: Coords[] = [];

  for (let x = 0; x < grid.length; x++) {
    const line = findLine(grid, { x, y: 0 }, { dX: 0, dY: 1 }, minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
