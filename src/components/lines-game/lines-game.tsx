import { useEffect, useRef, useState } from "preact/hooks";
import { isClient } from "shared/is/env";
import { cx } from "shared/cx";
import game from "./logic";
import s from "./lines-game.module.css";

export function LinesGame() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isClient && game.init();
  }, []);

  const isActiveCell = (x: number, y: number) => {
    return (
      game.Board.activeCoords.value?.x === x &&
      game.Board.activeCoords.value?.y === y
    );
  };

  const fullScreen = () => {
    if (!rootRef.current) return;
    if (rootRef.current.requestFullscreen) {
      rootRef.current.requestFullscreen();
      // @ts-ignore
    } else if (rootRef.current.webkitRequestFullscreen) {
      // @ts-ignore
      rootRef.current.webkitRequestFullscreen();
      // @ts-ignore
    } else if (rootRef.current.msRequestFullscreen) {
      // @ts-ignore
      rootRef.current.msRequestFullscreen();
    }
  };

  return (
    <div class={s.root} ref={rootRef}>
      <div class={s.main}>
        <div class={cx(s.grid, game.isShaking.value && s.shake)}>
          {game.Board.grid.value.map((row, y) => (
            <div class={s.row}>
              {row.map((cell, x) => (
                <div
                  onClick={() => game.cellClick({ x, y })}
                  class={cx(s.cell, isActiveCell(x, y) && s["cell-active"])}
                >
                  <div
                    class={cx(
                      "ball",
                      s.ball,
                      cell?.color ?? s["ball-invisible"],
                      cell?.isMoving && s["ball-moving"]
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div class={s.aside}>
        <p>Очки</p>
        <h1>{game.Score.score}</h1>

        <p>Рекорд</p>
        <h1>{game.Score.score}</h1>

        <p>Следующий ход</p>
        <ul class={s["next-balls"]}>
          {game.NextBalls.balls.value.map((ball) => (
            <li class={cx("ball", ball?.color ?? s["ball-invisible"])} />
          ))}
        </ul>
        <button onClick={() => game.nextTurn()}>Пропустить ход</button>

        <br />
        <br />
        <button onClick={() => game.start()}>Новая игра</button>

        <br />
        <label>
          <input type="checkbox" />
          классические
        </label>
        <label>
          <input type="checkbox" />
          звуки
        </label>

        <a href="/previous" data-astro-reload>
          previous game
        </a>
        <button onClick={() => fullScreen()}>full screen</button>
      </div>
    </div>
  );
}
