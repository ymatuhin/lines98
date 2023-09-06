import { expect, test } from "vitest";
import { findPath } from "./find-path";
import type { Grid, Cell } from "./board";
import { Ball } from "../ball";

const ball = new Ball("red");

test("straight horizontal line", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testGrid, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(5);
});

test("straight diagonal line", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testGrid, { x: 0, y: 0 }, { x: 4, y: 4 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(9);
});

test("impossible", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, ball, null, null],
    [ball, ball, ball, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testGrid, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(result).toBeNull();
});

test("long and branchy", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, ball, null, null],
    [ball, null, ball, null, ball],
    [null, null, ball, null, null],
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testGrid, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(17);
});

test("backwards", () => {
  const testGrid: Grid<Cell> = [
    [null, ball, null, null, null, null, null],
    [null, ball, null, null, null, null, null],
    [null, null, null, null, null, ball, null],
    [ball, ball, ball, null, null, null, null],
    [null, null, ball, null, ball, null, null],
    [ball, null, ball, null, null, null, null],
    [ball, null, null, null, null, null, null],
  ];

  const result = findPath(testGrid, { x: 5, y: 2 }, { x: 0, y: 4 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(12);
});
