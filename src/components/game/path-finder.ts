import type { Coords, Grid } from "./grid";
import {
  createGridWith,
  getGridCellByCoords,
  setGridCellByCoords,
} from "./grid.helpers";

type QueryItem = Coords & { path: Coords[] };

export function findPath(grid: Grid, coords: Coords, endCoords: Coords) {
  const query: QueryItem[] = [{ ...coords, path: [{ ...coords }] }];
  const checkedGrid = createGridWith(false);
  setGridCellByCoords(checkedGrid, coords, true);

  while (query.length) {
    const { x, y, path } = query.shift()!;
    setGridCellByCoords(checkedGrid, { x, y }, true);

    if (x === endCoords.x && y === endCoords.y) return path;

    handleCell({ x: x + 1, y }, path);
    handleCell({ x: x - 1, y }, path);
    handleCell({ x, y: y + 1 }, path);
    handleCell({ x, y: y - 1 }, path);
  }

  function handleCell(inputCoords: Coords, path: Coords[]) {
    if (
      getGridCellByCoords(checkedGrid, inputCoords) === false &&
      getGridCellByCoords(grid, inputCoords) === null
    ) {
      query.push({ ...inputCoords, path: [...path, inputCoords] });
      setGridCellByCoords(checkedGrid, inputCoords, true);
    }
  }

  return null;
}
