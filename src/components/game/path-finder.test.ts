import { expect, test } from "vitest";
import { findPath } from "./path-finder";
import type { Grid } from "./grid";
import { createBall } from "./ball";

const ball = createBall("blue");

test("straight horizontal line", () => {
  const testBoard: Grid = [
    [ball, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testBoard, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(5);
});

test("straight diagonal line", () => {
  const testBoard: Grid = [
    [ball, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testBoard, { x: 0, y: 0 }, { x: 4, y: 4 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(9);
});

test("impossible", () => {
  const testBoard: Grid = [
    [ball, null, ball, null, null],
    [ball, ball, ball, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testBoard, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(result).toBeNull();
});

test("long and branchy", () => {
  const testBoard: Grid = [
    [ball, null, ball, null, null],
    [ball, null, ball, null, ball],
    [null, null, ball, null, null],
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
  ];

  const result = findPath(testBoard, { x: 0, y: 0 }, { x: 4, y: 0 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(17);
});

test("backwards", () => {
  const testBoard: Grid = [
    [null, ball, null, null, null, null, null],
    [null, ball, null, null, null, null, null],
    [null, null, null, null, null, ball, null],
    [ball, ball, ball, null, null, null, null],
    [null, null, ball, null, ball, null, null],
    [ball, null, ball, null, null, null, null],
    [ball, null, null, null, null, null, null],
  ];

  const result = findPath(testBoard, { x: 5, y: 2 }, { x: 0, y: 4 });
  expect(Array.isArray(result)).toBeTruthy();
  expect(result?.length).toBe(12);
});
