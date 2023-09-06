import type { Coords, Grid, Cell } from "./board";
import { createGrid, getCellByCoords, setCellByCoords } from "./helpers";

type QueryItem = Coords & { path: Coords[] };

export function findPath(grid: Grid<Cell>, coords: Coords, endCoords: Coords) {
  const query: QueryItem[] = [{ ...coords, path: [{ ...coords }] }];
  const checkedGrid = createGrid(grid.length, false);
  setCellByCoords(checkedGrid, coords, true);

  while (query.length) {
    const { x, y, path } = query.shift()!;
    setCellByCoords(checkedGrid, { x, y }, true);

    if (x === endCoords.x && y === endCoords.y) return path;

    handleCell({ x: x + 1, y }, path);
    handleCell({ x: x - 1, y }, path);
    handleCell({ x, y: y + 1 }, path);
    handleCell({ x, y: y - 1 }, path);
  }

  function handleCell(inputCoords: Coords, path: Coords[]) {
    if (
      getCellByCoords(checkedGrid, inputCoords) === false &&
      getCellByCoords(grid, inputCoords) === null
    ) {
      query.push({ ...inputCoords, path: [...path, inputCoords] });
      setCellByCoords(checkedGrid, inputCoords, true);
    }
  }

  return null;
}
