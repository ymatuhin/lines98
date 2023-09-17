import shuffle from "lodash/shuffle";
import { classLogger, createLogger } from "shared/logger";
import type { Ball } from "../ball";
import { findLines } from "./find-lines";
import { findPath } from "./find-path";
import { createGrid, getCellByCoords, setCellByCoords } from "./helpers";
import { signal, batch } from "@preact/signals";

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
  grid = signal<CellGrid>(createGrid(GRID_SIZE, null));
  activeCoords = signal<Coords | null>(null);

  get activeCell() {
    if (!this.activeCoords.value) return null;
    return this.getCell(this.activeCoords.value);
  }

  get hasActiveCoords() {
    return Boolean(this.activeCoords.value);
  }

  get isGridEmpty() {
    return this.grid.value.flat().filter(Boolean).length === 0;
  }

  get emptyCells() {
    const emptyList: Coords[] = [];
    this.grid.value.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === null) emptyList.push({ x, y });
      })
    );
    return emptyList;
  }

  reset() {
    this.grid.value = createGrid(GRID_SIZE, null);
    this.activeCoords.value = null;
  }

  // returns false if no more empty cells
  addBalls(balls: Ball[]) {
    const emptyCells = shuffle(this.emptyCells);
    batch(() => {
      for (const ball of balls) {
        const emptyCellCoords = emptyCells.shift();
        if (!emptyCellCoords) return false;
        this.setCell(emptyCellCoords, ball);
      }
    });
    return emptyCells.length > 0;
  }

  getCell(coords: Coords) {
    return getCellByCoords(this.grid.value, coords);
  }

  setCell(coords: Coords, cell: Cell) {
    // required to trigger signal update
    const prev = [...this.grid.value];
    const newVal = setCellByCoords(prev, coords, cell);
    this.grid.value = newVal;
  }

  clearCells(coords: Coords[]) {
    batch(() => {
      coords.forEach((coord) => this.setCell(coord, null));
    });
  }

  findPath(coords: Coords) {
    if (!this.activeCoords.value) throw new Error("No active coords");
    return findPath(this.grid.value, this.activeCoords.value, coords);
  }

  moveActiveBall(path: Coords[]) {
    if (path.length < 2) return new Promise((res) => setTimeout(res, 200));
    return new Promise((res) => {
      const [from, to, ...rest] = path;
      const finalStep = rest.length === 0;
      const prevCell = this.getCell(from)!;

      setTimeout(async () => {
        if (finalStep) this.activeCoords.value = null;
        this.setCell(from, null);
        this.setCell(to, { ...prevCell, isMoving: !finalStep });

        res(await this.moveActiveBall([to, ...rest]));
      }, 25);
    });
  }

  findLines() {
    return findLines(this.grid.value, MIN_LINE_SIZE);
  }
}
