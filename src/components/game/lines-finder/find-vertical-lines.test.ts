import { expect, test } from "vitest";
import { findVerticalLines } from "./find-vertical-lines";
import type { Grid } from "../grid";
import { createBall } from "../ball";

const ball = createBall("blue");

test("find one line at start", () => {
  const testBoard: Grid = [
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
  ];
  expect(findVerticalLines(testBoard, 5)).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
  ]);
});

test("find one line at end", () => {
  const testBoard: Grid = [
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
  ];
  expect(findVerticalLines(testBoard, 5)).toEqual([
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
  ]);
});

test("find one line at middle", () => {
  const testBoard: Grid = [
    [null, null, null, null, null],
    [null, null, ball, null, null],
    [null, null, ball, null, null],
    [null, null, ball, null, null],
    [null, null, null, null, null],
  ];
  expect(findVerticalLines(testBoard, 3)).toEqual([
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
});
