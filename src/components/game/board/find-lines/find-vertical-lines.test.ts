import { expect, test } from "vitest";
import { findVerticalLines } from "./find-vertical-lines";
import type { Grid, Cell } from "../board";
import { Ball } from "../../ball";

const ball = new Ball("blue");

test("find one line at start", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
    [ball, null, null, null, null],
  ];
  expect(findVerticalLines(testGrid, 5)).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
  ]);
});

test("find one line at end", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
    [null, null, null, null, ball],
  ];
  expect(findVerticalLines(testGrid, 5)).toEqual([
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
  ]);
});

test("find one line at middle", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, null],
    [null, null, ball, null, null],
    [null, null, ball, null, null],
    [null, null, ball, null, null],
    [null, null, null, null, null],
  ];
  expect(findVerticalLines(testGrid, 3)).toEqual([
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
});
