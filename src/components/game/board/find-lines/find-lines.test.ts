import { expect, test } from "vitest";
import { findLines } from "./find-lines";
import type { Grid, Cell } from "../board";
import { Ball } from "../../ball";

const ball = new Ball("blue");

test("star", () => {
  const testGrid: Grid<Cell> = [
    [null, null, ball, null, null],
    [null, null, ball, null, null],
    [ball, ball, ball, ball, ball],
    [null, null, ball, null, null],
    [null, null, ball, null, null],
  ];

  const result = findLines(testGrid);

  // 5 horizontal, 5 vertical, 5 middle cross
  expect(result.length).toBe(15);

  // horizontal
  expect(result).toContainEqual({ x: 0, y: 2 });
  expect(result).toContainEqual({ x: 1, y: 2 });
  expect(result).toContainEqual({ x: 2, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 2 });
  expect(result).toContainEqual({ x: 4, y: 2 });

  // vertical
  expect(result).toContainEqual({ x: 2, y: 4 });
  expect(result).toContainEqual({ x: 2, y: 1 });
  expect(result).toContainEqual({ x: 2, y: 2 });
  expect(result).toContainEqual({ x: 2, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 4 });
});

test("star", () => {
  const testGrid: Grid<Cell> = [
    [ball, null, null, null, ball],
    [null, ball, null, ball, null],
    [null, null, ball, null, null],
    [null, ball, null, ball, null],
    [ball, null, null, null, ball],
  ];

  const result = findLines(testGrid);

  // 5 diagonal, 5 another diagonal, 5 middle cross
  expect(result.length).toBe(15);

  // diagonal 1
  expect(result).toContainEqual({ x: 0, y: 0 });
  expect(result).toContainEqual({ x: 1, y: 1 });
  expect(result).toContainEqual({ x: 2, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 3 });
  expect(result).toContainEqual({ x: 4, y: 4 });

  // diagonal 2
  expect(result).toContainEqual({ x: 0, y: 4 });
  expect(result).toContainEqual({ x: 1, y: 3 });
  expect(result).toContainEqual({ x: 2, y: 2 });
  expect(result).toContainEqual({ x: 3, y: 1 });
  expect(result).toContainEqual({ x: 4, y: 0 });
});
