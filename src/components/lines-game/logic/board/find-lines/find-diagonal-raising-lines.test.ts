import { expect, test } from "vitest";
import { findDiagonalRaisingLines } from "./find-diagonal-raising-lines";
import type { Grid, Cell } from "../board";
import { Ball } from "../../ball";

const ball = new Ball("blue");

test("find line from corner to corner", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, ball],
    [null, null, null, ball, null],
    [null, null, ball, null, null],
    [null, ball, null, null, null],
    [ball, null, null, null, null],
  ];
  expect(findDiagonalRaisingLines(testGrid, 5)).toEqual([
    { x: 0, y: 4 },
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
    { x: 4, y: 0 },
  ]);
});

test("find line from shifted middle", () => {
  const testGrid: Grid<Cell> = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, ball],
    [null, null, null, null, ball, null],
    [null, null, null, ball, null, null],
    [null, null, ball, null, null, null],
    [null, ball, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  expect(findDiagonalRaisingLines(testGrid, 5)).toEqual([
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
  ]);
});
