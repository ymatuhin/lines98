import { batch, signal } from "@preact/signals";
import { classLogger, createLogger } from "shared/logger";
import { createStorage } from "shared/storage";
import { Ball } from "./ball";
import { Board, type ActiveCoords, type CellGrid, type Coords } from "./board";
import { NextBalls, type NextBallsTuple } from "./next-balls";
import { Score } from "./score";

type StorageData = {
  grid: CellGrid;
  activeCoords: ActiveCoords;
  nextBalls: NextBallsTuple;
};

const log = createLogger("👾 game");

@classLogger(log)
export class Game {
  isOver = signal(false);
  isShaking = signal(false);
  isAnimating = signal(false);
  #storage = createStorage<StorageData>("state");

  Board;
  NextBalls;
  Score;
  constructor(Board: Board, NextBalls: NextBalls, Score: Score) {
    this.Board = Board;
    this.NextBalls = NextBalls;
    this.Score = Score;
  }

  init() {
    if (this.#storage.has()) this.restoreState();
    else this.start();
  }

  start() {
    this.isOver.value = false;
    this.Board.reset();
    this.Score.reset();
    this.NextBalls.update();
    this.Board.addBalls(this.NextBalls.balls.value);
    this.NextBalls.update();
    this.saveState();
  }

  nextTurn() {
    if (this.isOver.value) return;
    const result = this.Board.addBalls(this.NextBalls.balls.value);
    this.checkLines();
    if (!result) return this.gameOver();

    this.NextBalls.update();
    this.saveState();
  }

  gameOver() {
    this.isOver.value = true;
    this.#storage.clear();
  }

  shake() {
    this.isShaking.value = true;
    setTimeout(() => (this.isShaking.value = false), 200);
  }

  async cellClick(coords: Coords) {
    const clickedCell = this.Board.getCell(coords);
    if (clickedCell) {
      this.Board.activeCoords.value = coords;
    } else if (this.Board.hasActiveCoords) {
      const path = this.Board.findPath(coords);
      if (!path) return this.shake();
      this.isAnimating.value = true;
      await this.Board.moveActiveBall(path);
      this.isAnimating.value = false;

      const hadLines = this.checkLines();
      if (!hadLines) this.nextTurn();
      else this.saveState();
    } else {
      this.shake();
    }
  }

  checkLines() {
    const lines = this.Board.findLines();

    if (lines.length) {
      this.Board.clearCells(lines);
      this.Score.add(lines.length);
    }

    return Boolean(lines.length);
  }

  saveState() {
    const state: StorageData = {
      grid: this.Board.grid.value,
      activeCoords: this.Board.activeCoords.value,
      nextBalls: this.NextBalls.balls.value,
    };
    this.#storage.set(state);
  }

  restoreState() {
    const { grid, activeCoords, nextBalls } = this.#storage.get();
    batch(() => {
      this.Board.grid.value = grid;
      this.Board.activeCoords.value = activeCoords;
      this.NextBalls.balls.value = nextBalls;
    });
  }
}

const nextBalls = new NextBalls(Ball.randomColor);
const board = new Board();
const score = new Score();

export default new Game(board, nextBalls, score);
