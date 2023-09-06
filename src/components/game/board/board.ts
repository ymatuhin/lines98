import shuffle from "lodash/shuffle";
import { classLogger, createLogger } from "shared/logger";
import type { Ball } from "../ball";
import { findLines } from "./find-lines";
import { findPath } from "./find-path";
import { createGrid, getCellByCoords, setCellByCoords } from "./helpers";

export type Coords = { x: number; y: number };
export type Cell = Ball | null;
export type Grid<T> = T[][];
export type CellGrid = Grid<Cell>;
export type ActiveCoords = Coords | null;

export const GRID_SIZE = 9;
export const MIN_LINE_SIZE = 5;

const log = createLogger("🧮 board");

@classLogger(log)
export class Board {
  grid = createGrid(GRID_SIZE, null) as CellGrid;
  activeCoords = null as Coords | null;

  get activeCell() {
    if (!this.activeCoords) return null;
    return this.getCell(this.activeCoords);
  }

  get hasActiveCoords() {
    return Boolean(this.activeCoords);
  }

  get isGridEmpty() {
    return this.grid.flat().filter(Boolean).length === 0;
  }

  get emptyCells() {
    const emptyList: Coords[] = [];
    this.grid.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === null) emptyList.push({ x, y });
      })
    );
    return emptyList;
  }

  reset() {
    this.grid = createGrid(GRID_SIZE, null);
  }

  // returns false if no more empty cells
  addBalls(balls: Ball[]) {
    const emptyCells = shuffle(this.emptyCells);
    for (const ball of balls) {
      const cell = emptyCells.shift();
      if (!cell) return false;
      this.setCell(cell, ball);
    }
    return emptyCells.length > 0;
  }

  getCell(coords: Coords) {
    return getCellByCoords(this.grid, coords);
  }

  setCell(coords: Coords, cell: Cell) {
    this.grid = setCellByCoords(this.grid, coords, cell);
  }

  clearCells(coords: Coords[]) {
    coords.forEach((coord) => this.setCell(coord, null));
  }

  findPath(coords: Coords) {
    if (!this.activeCoords) throw new Error("No active coords");
    return findPath(this.grid, this.activeCoords, coords);
  }

  moveActiveBall(coords: Coords) {
    if (!this.activeCoords) throw new Error("No active coords");
    this.setCell(coords, this.activeCell);
    this.setCell(this.activeCoords, null);
    this.activeCoords = null;

    return Promise.resolve();
  }

  findLines() {
    return findLines(this.grid, MIN_LINE_SIZE);
  }
}
