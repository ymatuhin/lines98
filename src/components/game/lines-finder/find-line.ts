import type { Coords, Grid } from "../grid";

export function findLine(
  grid: Grid,
  startCoords: Coords,
  { dX, dY }: { dX: number; dY: number },
  lineSize: number
) {
  let line: Coords[] = [];
  let { x, y } = startCoords;
  let prev = undefined;
  let current = grid[y]?.[x];

  while (current !== undefined) {
    if (current === null) {
      // empty cell
      if (line.length >= lineSize) return line;
      line = [];
    } else if (!prev) {
      // has ball in start coords
      line = [{ x, y }];
    } else if (prev.color === current.color) {
      // has ball, has prev, same color as prev
      line.push({ x, y });
    }

    prev = current;
    x += dX;
    y += dY;
    current = grid[y]?.[x];
  }

  return line.length >= lineSize ? line : null;
}
