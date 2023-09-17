import { expect, test } from "vitest";
import { findHorizontalLines } from "./find-horizontal-lines";
import type { Grid, Cell } from "../board";
import { Ball } from "../../ball";

const ball = new Ball("blue");

test("find one line at start", () => {
  const testGrid: Grid<Cell> = [
    [ball, ball, ball, ball, ball],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findHorizontalLines(testGrid, 5)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ]);
});

test("find one line at end", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [ball, ball, ball, ball, ball],
  ];
  expect(findHorizontalLines(testGrid, 5)).toEqual([
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
  ]);
});

test("find one line at middle", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findHorizontalLines(testGrid, 3)).toEqual([
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ]);
});
