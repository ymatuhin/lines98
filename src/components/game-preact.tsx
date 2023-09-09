import { useEffect } from "preact/hooks";
import { isClient } from "shared/is/env";
import game from "./game";
import "./game-preact.css";

function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
}

export function GamePreact() {
  useEffect(() => {
    if (isClient) game.init();
  }, []);

  const isActiveCell = (x: number, y: number) => {
    return (
      game.Board.activeCoords.value?.x === x &&
      game.Board.activeCoords.value?.y === y
    );
  };

  return (
    <div>
      <h1>Score: {game.Score.score}</h1>

      <ul class="next-balls">
        {game.NextBalls.balls.value.map((ball) => (
          <li class={cx("ball", ball?.color ?? "invisible")} />
        ))}
      </ul>

      <button onClick={() => game.start()}>restart</button>
      <button onClick={() => game.nextTurn()}>nextTurn</button>

      <p>isShaking: {String(game.isShaking)}</p>
      <p>isAnimating: {String(game.isAnimating)}</p>

      <table class={cx("grid", game.isShaking.value && "shake")}>
        {game.Board.grid.value.map((row, y) => (
          <tr>
            {row.map((cell, x) => (
              <td
                onClick={() => game.cellClick({ x, y })}
                class={cx(isActiveCell(x, y) && "active")}
              >
                <div
                  class={cx(
                    "ball",
                    cell?.color ?? "invisible",
                    cell?.isMoving && "moving"
                  )}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
