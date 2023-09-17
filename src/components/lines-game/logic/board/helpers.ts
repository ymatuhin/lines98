import type { Coords, Grid } from "./board";

export function createGrid<T>(gridSize: number, item: T): T[][] {
  return Array(gridSize)
    .fill(item)
    .map((_) => Array(gridSize).fill(item));
}

export function getCellByCoords<T>(grid: Grid<T>, coords: Coords) {
  return grid[coords.y]?.[coords.x];
}

export function setCellByCoords<T>(grid: Grid<T>, coords: Coords, value: T) {
  grid[coords.y][coords.x] = value;
  return grid;
}

export function removeBalls<T>(grid: Grid<T>, coordsArr: Coords[]) {
  coordsArr.forEach((coords) => {
    setCellByCoords(grid, coords, null);
  });
}
