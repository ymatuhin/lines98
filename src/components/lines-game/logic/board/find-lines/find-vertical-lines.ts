import type { Coords, Grid, Cell } from "../board";
import { findLine } from "./find-line";

export function findVerticalLines(grid: Grid<Cell>, minLineSize: number) {
  const lines: Coords[] = [];

  for (let x = 0; x < grid.length; x++) {
    const line = findLine(grid, { x, y: 0 }, [0, 1], minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
