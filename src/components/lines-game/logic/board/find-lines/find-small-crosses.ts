import type { Coords, CellGrid } from "../board";
import { getCellByCoords } from "../helpers";

export function findSmallCrosses(grid: CellGrid) {
  const lines: Coords[] = [];

  grid.forEach((row, y) => {
    if (y < 1 || y > grid.length - 2) return;
    row.forEach((col, x) => {
      if (x < 1 || x > grid.length - 2) return;

      const verticalCrossLines = findVerticalCross(grid, { x, y });
      if (verticalCrossLines) lines.push(...verticalCrossLines);

      const diagonalCrossLines = findDiagonalCross(grid, { x, y });
      if (diagonalCrossLines) lines.push(...diagonalCrossLines);
    });
  });

  return lines;
}

export function findVerticalCross(grid: CellGrid, coords: Coords) {
  const middleCell = getCellByCoords(grid, coords);
  if (!middleCell) return null;

  const crossCoords = [
    { x: coords.x - 1, y: coords.y },
    { x: coords.x + 1, y: coords.y },
    { x: coords.x, y: coords.y + 1 },
    { x: coords.x, y: coords.y - 1 },
  ];

  const hasCross = crossCoords.every((coords) => {
    const cell = getCellByCoords(grid, coords);
    return middleCell.color === cell?.color;
  });

  return hasCross ? [...crossCoords, coords] : null;
}

export function findDiagonalCross(grid: CellGrid, coords: Coords) {
  const middleCell = getCellByCoords(grid, coords);
  if (!middleCell) return;

  const crossCoords = [
    { x: coords.x - 1, y: coords.y - 1 },
    { x: coords.x + 1, y: coords.y - 1 },
    { x: coords.x - 1, y: coords.y + 1 },
    { x: coords.x + 1, y: coords.y + 1 },
  ];

  const hasCross = crossCoords.every((coords) => {
    const cell = getCellByCoords(grid, coords);
    return middleCell.color === cell?.color;
  });

  return hasCross ? [...crossCoords, coords] : null;
}
