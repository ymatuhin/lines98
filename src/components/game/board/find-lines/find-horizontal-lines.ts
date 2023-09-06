import type { Coords, Grid, Cell } from "../board";
import { findLine } from "./find-line";

export function findHorizontalLines(grid: Grid<Cell>, minLineSize: number) {
  const lines: Coords[] = [];

  for (let y = 0; y < grid.length; y++) {
    const line = findLine(grid, { x: 0, y }, [1, 0], minLineSize);
    if (line) lines.push(...line);
  }

  return lines;
}
