import type { Coords } from "../board";

export type Vector = [number, number];

export function getFullLine(
  gridSize: number,
  startCoords: Coords,
  vector: Vector
) {
  const fullLine: Coords[] = [];

  for (
    let x = startCoords.x, y = startCoords.y;
    x < gridSize && x >= 0 && y >= 0 && y < gridSize;
    x += vector[0], y += vector[1]
  ) {
    fullLine.push({ x, y });
  }

  return fullLine;
}
