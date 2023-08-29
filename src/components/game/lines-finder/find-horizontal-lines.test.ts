import { expect, test } from "vitest";
import { findHorizontalLines } from "./find-horizontal-lines";
import type { Grid } from "../grid";
import { createBall } from "../ball";

const ball = createBall("blue");

test("find one line at start", () => {
  const testBoard: Grid = [
    [ball, ball, ball, ball, ball],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findHorizontalLines(testBoard, 5)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ]);
});

test("find one line at end", () => {
  const testBoard: Grid = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [ball, ball, ball, ball, ball],
  ];
  expect(findHorizontalLines(testBoard, 5)).toEqual([
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
  ]);
});

test("find one line at middle", () => {
  const testBoard: Grid = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findHorizontalLines(testBoard, 3)).toEqual([
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ]);
});
