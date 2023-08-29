import { expect, test } from "vitest";
import { findLines } from "./find-lines";
import type { Grid } from "../grid";
import { createBall } from "../ball";

const ball = createBall("blue");

test("star", () => {
  const testBoard: Grid = [
    [ball, null, ball, null, ball],
    [null, ball, ball, ball, null],
    [ball, ball, ball, ball, ball],
    [null, ball, ball, ball, null],
    [ball, null, ball, null, ball],
  ];

  const result = findLines(testBoard);
  expect(result.length).toBe(20);

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

  // exclude
  expect(result).not.toContainEqual({ x: 1, y: 0 });
  expect(result).not.toContainEqual({ x: 3, y: 0 });
  expect(result).not.toContainEqual({ x: 0, y: 1 });
  expect(result).not.toContainEqual({ x: 4, y: 1 });
  expect(result).not.toContainEqual({ x: 0, y: 3 });
  expect(result).not.toContainEqual({ x: 4, y: 3 });
  expect(result).not.toContainEqual({ x: 1, y: 4 });
  expect(result).not.toContainEqual({ x: 3, y: 4 });
});
