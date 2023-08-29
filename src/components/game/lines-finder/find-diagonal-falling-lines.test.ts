import { expect, test } from "vitest";
import { findDiagonalFallingLines } from "./find-diagonal-falling-lines";
import type { Grid } from "../grid";
import { createBall } from "../ball";

const ball = createBall("blue");

test("find one line from corner to corner", () => {
  const testBoard: Grid = [
    [ball, null, null, null, null],
    [null, ball, null, null, null],
    [null, null, ball, null, null],
    [null, null, null, ball, null],
    [null, null, null, null, ball],
  ];
  expect(findDiagonalFallingLines(testBoard, 5)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ]);
});

test("find line from shifted middle", () => {
  const testBoard: Grid = [
    [null, null, null, null, null, null],
    [null, ball, null, null, null, null],
    [null, null, ball, null, null, null],
    [null, null, null, ball, null, null],
    [null, null, null, null, ball, null],
    [null, null, null, null, null, ball],
    [null, null, null, null, null, null],
  ];
  expect(findDiagonalFallingLines(testBoard, 5)).toEqual([
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
  ]);
});
