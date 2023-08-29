import { get, writable } from "svelte/store";
import type { Ball } from "./ball";
import {
  createGridWith,
  getGridCellByCoords,
  setGridCellByCoords,
} from "./grid.helpers";

export type Coords = { x: number; y: number };
export type Cell = Ball | null;
export type Grid = Cell[][];

export const $grid = writable<Grid>(createGridWith(null));
export const $fullCells = writable<Coords[]>([]); // actually derived
export const $emptyCells = writable<Coords[]>([]); // actually derived
export const $activeBallCoords = writable<Coords | null>(null);

export function resetGrid() {
  $grid.set(createGridWith(null));
}

export function setCell(coords: Coords, cell: Cell) {
  $grid.update((grid) => setGridCellByCoords(grid, coords, cell));
}

export function getCell(coords: Coords) {
  return getGridCellByCoords(get($grid), coords);
}

export function hasBall(coords: Coords) {
  return getCell(coords) !== null;
}

export function moveActiveBall(coords: Coords) {
  const activeCoords = get($activeBallCoords);
  if (!activeCoords) return;

  setCell(coords, getCell(activeCoords));
  setCell(activeCoords, null);
  $activeBallCoords.set(null);
}

export function removeBalls(coordsArr: Coords[]) {
  coordsArr.forEach((coords) => setCell(coords, null));
}

// sync empty and full lists
$grid.subscribe((grid) => {
  const emptyList: Coords[] = [];
  const fullList: Coords[] = [];
  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === null) emptyList.push({ x, y });
      else fullList.push({ x, y });
    })
  );
  $emptyCells.set(emptyList);
  $fullCells.set(fullList);
});
