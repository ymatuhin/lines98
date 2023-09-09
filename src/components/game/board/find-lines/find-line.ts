import type { Coords, Grid, Cell } from "../board";
import { getCellByCoords } from "../helpers";
import { type Vector, getFullLine } from "./get-full-line";

export function findLine(
  grid: Grid<Cell>,
  startCoords: Coords,
  vector: Vector,
  minLineSize: number
) {
  const fullLine = getFullLine(grid.length, startCoords, vector);

  let line: Coords[] = [];
  let prevCoords: Coords | null = null;
  for (const coords of fullLine) {
    const prevCell = prevCoords ? getCellByCoords(grid, prevCoords) : null;
    const cell = getCellByCoords(grid, coords);

    if (!cell) {
      if (line.length >= minLineSize) break;
      line = [];
    } else if (!prevCell || cell?.color !== prevCell?.color) {
      if (line.length >= minLineSize) break;
      line = [coords];
    } else if (cell?.color === prevCell?.color) {
      line.push(coords);
    }

    prevCoords = coords;
  }

  return line.length >= minLineSize ? line : null;
}
