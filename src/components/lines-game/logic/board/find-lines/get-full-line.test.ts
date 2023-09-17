import { expect, test } from "vitest";
import { getFullLine } from "./get-full-line";

test("horizontal grid size 3", () => {
  const result = getFullLine(3, { x: 0, y: 0 }, [1, 0]);
  expect(result).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
});

test("vertical grid size 3", () => {
  const result = getFullLine(3, { x: 0, y: 0 }, [0, 1]);
  expect(result).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ]);
});

test("diagonal grid size 5", () => {
  const result = getFullLine(5, { x: 0, y: 0 }, [1, 1]);
  expect(result).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ]);
});
