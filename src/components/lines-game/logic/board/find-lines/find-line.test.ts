import type { Grid, Cell } from "../board";
import { expect, test } from "vitest";
import { findLine } from "./find-line";
import { Ball } from "../../ball";

const ball = new Ball("blue");
const ball2 = new Ball("orange");

test("find horizontal line with 3 items at start", () => {
  const testGrid: Grid<Cell> = [
    [ball, ball, ball, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findLine(testGrid, { x: 0, y: 0 }, [1, 0], 3)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
});

test("find horizontal line with 3 items after empty cell", () => {
  const testGrid: Grid<Cell> = [
    [null, ball, ball, ball, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findLine(testGrid, { x: 0, y: 0 }, [1, 0], 3)).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ]);
});

test("find horizontal line with 3 items after another ball", () => {
  const testGrid: Grid<Cell> = [
    [ball2, ball, ball, ball, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findLine(testGrid, { x: 0, y: 0 }, [1, 0], 3)).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ]);
});

test("find horizontal line with full line", () => {
  const testGrid: Grid<Cell> = [
    [ball, ball, ball, ball, ball],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  expect(findLine(testGrid, { x: 0, y: 0 }, [1, 0], 3)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ]);
});
