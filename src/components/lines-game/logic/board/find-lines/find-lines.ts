import type { Grid, Cell } from "../board";
import { MIN_LINE_SIZE } from "../board";

import { findDiagonalFallingLines } from "./find-diagonal-falling-lines";
import { findDiagonalRaisingLines } from "./find-diagonal-raising-lines";
import { findHorizontalLines } from "./find-horizontal-lines";
import { findSmallCrosses } from "./find-small-crosses";
import { findVerticalLines } from "./find-vertical-lines";

export function findLines(grid: Grid<Cell>, minLineSize = MIN_LINE_SIZE) {
  const vertical = findVerticalLines(grid, minLineSize);
  const horizontal = findHorizontalLines(grid, minLineSize);
  const diagonalFalling = findDiagonalFallingLines(grid, minLineSize);
  const diagonalRising = findDiagonalRaisingLines(grid, minLineSize);
  const crosses = findSmallCrosses(grid);

  return [
    ...vertical,
    ...horizontal,
    ...diagonalFalling,
    ...diagonalRising,
    ...crosses,
  ];
}
