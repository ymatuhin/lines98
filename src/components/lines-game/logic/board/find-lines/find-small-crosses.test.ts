import { expect, test } from "vitest";
import type { CellGrid } from "../board";
import { Ball } from "../../ball";
import {
  findDiagonalCross,
  findSmallCrosses,
  findVerticalCross,
} from "./find-small-crosses";

const ball = new Ball("orange");

test("vertical cross fails", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, null, ball, null, null],
    [null, ball, ball, ball, null],
    [null, null, ball, null, null],
    [null, null, null, null, null],
  ];
  expect(findVerticalCross(testGrid, { x: 1, y: 1 })).toBe(null);
});

test("vertical cross works", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, null, ball, null, null],
    [null, ball, ball, ball, null],
    [null, null, ball, null, null],
    [null, null, null, null, null],
  ];

  const result = findVerticalCross(testGrid, { x: 2, y: 2 });
  expect(result?.length).toBe(5);
  expect(result).toContainEqual({ x: 1, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 2 });
  expect(result).toContainEqual({ x: 2, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 1 });
  expect(result).toContainEqual({ x: 2, y: 2 });
});

test("diagonal cross fails", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, ball, null, ball, null],
    [null, null, ball, null, null],
    [null, ball, null, ball, null],
    [null, null, null, null, null],
  ];
  expect(findDiagonalCross(testGrid, { x: 1, y: 1 })).toBe(null);
});

test("diagonal cross works", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, ball, null, ball, null],
    [null, null, ball, null, null],
    [null, ball, null, ball, null],
    [null, null, null, null, null],
  ];

  const result = findDiagonalCross(testGrid, { x: 2, y: 2 });
  expect(result?.length).toBe(5);
  expect(result).toContainEqual({ x: 1, y: 1 });
  expect(result).toContainEqual({ x: 3, y: 1 });
  expect(result).toContainEqual({ x: 1, y: 3 });
  expect(result).toContainEqual({ x: 3, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 2 });
});

test("find small crosses fails", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, ball, null, ball, null],
    [null, null, null, null, null],
    [null, ball, null, ball, null],
    [null, null, null, null, null],
  ];

  const result = findSmallCrosses(testGrid);
  expect(result?.length).toBe(0);
});

test("find small crosses diagonal", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, ball, null, ball, null],
    [null, null, ball, null, null],
    [null, ball, null, ball, null],
    [null, null, null, null, null],
  ];

  const result = findSmallCrosses(testGrid);
  expect(result?.length).toBe(5);
  expect(result).toContainEqual({ x: 1, y: 1 });
  expect(result).toContainEqual({ x: 3, y: 1 });
  expect(result).toContainEqual({ x: 1, y: 3 });
  expect(result).toContainEqual({ x: 3, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 2 });
});

test("find small crosses vertical", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, null, ball, null, null],
    [null, ball, ball, ball, null],
    [null, null, ball, null, null],
    [null, null, null, null, null],
  ];

  const result = findSmallCrosses(testGrid);
  expect(result?.length).toBe(5);
  expect(result).toContainEqual({ x: 1, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 2 });
  expect(result).toContainEqual({ x: 2, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 1 });
  expect(result).toContainEqual({ x: 2, y: 2 });
});

test("find small crosses both", () => {
  const testGrid: CellGrid = [
    [null, null, null, null, null],
    [null, ball, ball, ball, null],
    [null, ball, ball, ball, null],
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
  ];

  const result = findSmallCrosses(testGrid);
  expect(result?.length).toBe(10);

  expect(result).toContainEqual({ x: 1, y: 1 });
  expect(result).toContainEqual({ x: 3, y: 1 });
  expect(result).toContainEqual({ x: 1, y: 3 });
  expect(result).toContainEqual({ x: 3, y: 3 });
  expect(result).toContainEqual({ x: 1, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 2 });
  expect(result).toContainEqual({ x: 2, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 1 });
  expect(result).toContainEqual({ x: 2, y: 2 });
});
