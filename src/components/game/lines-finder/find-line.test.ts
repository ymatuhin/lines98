import { expect, test } from "vitest";
import { findLine } from "./find-line";
import type { Grid } from "../grid";
import { createBall } from "../ball";

const ball = createBall("blue");

test("find horizontal line with 3 items in the middle", () => {
  const testBoard: Grid = [[null, null, ball, ball, ball, null, null]];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 1, dY: 0 }, 3)).toEqual([
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ]);
});

test("find horizontal line with 3 items in the start", () => {
  const testBoard: Grid = [[ball, ball, ball, null, null, null, ball]];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 1, dY: 0 }, 3)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
});

test("find horizontal line with 3 items in the end", () => {
  const testBoard: Grid = [[null, null, null, ball, ball, ball]];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 1, dY: 0 }, 3)).toEqual([
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
  ]);
});

test("find horizontal line with 5 items in the end", () => {
  const testBoard: Grid = [[null, null, null, ball, ball, ball, ball, ball]];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 1, dY: 0 }, 3)).toEqual([
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
  ]);
});

test("find vertical line with 3 items in the middle", () => {
  const testBoard: Grid = [[null], [ball], [ball], [ball], [null]];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 0, dY: 1 }, 3)).toEqual([
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ]);
});

test("find diagonal line with full items", () => {
  const testBoard: Grid = [
    [ball, null, null, null],
    [null, ball, null, null],
    [null, null, ball, null],
    [null, null, null, ball],
  ];
  expect(findLine(testBoard, { x: 0, y: 0 }, { dX: 1, dY: 1 }, 3)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ]);
});
