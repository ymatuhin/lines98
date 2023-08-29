import type { Grid } from "../grid";

import { findDiagonalFallingLines } from "./find-diagonal-falling-lines";
import { findDiagonalRaisingLines } from "./find-diagonal-raising-lines";
import { findHorizontalLines } from "./find-horizontal-lines";
import { findVerticalLines } from "./find-vertical-lines";

export function findLines(grid: Grid, minLineSize = 5) {
  const vertical = findVerticalLines(grid, minLineSize);
  const horizontal = findHorizontalLines(grid, minLineSize);
  const diagonalFalling = findDiagonalFallingLines(grid, minLineSize);
  const diagonalRising = findDiagonalRaisingLines(grid, minLineSize);

  return [...vertical, ...horizontal, ...diagonalFalling, ...diagonalRising];
}
