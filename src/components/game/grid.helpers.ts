import type { Coords, Grid } from "./grid";

export function createGridWith(item: any = null) {
  const size = 9;

  return Array(size)
    .fill(item)
    .map((_) => Array(size).fill(item));
}

export function getGridCellByCoords<T>(grid: T[][], coords: Coords) {
  return grid[coords.y]?.[coords.x];
}

export function setGridCellByCoords<T>(
  grid: T[][],
  coords: Coords,
  value: any
) {
  grid[coords.y][coords.x] = value;
  return grid;
}
