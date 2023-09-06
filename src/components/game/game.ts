import { classLogger, createLogger } from "shared/logger";
import { createStorage } from "shared/storage";
import { createStore } from "shared/store";
import { Ball } from "./ball";
import { Board, type ActiveCoords, type CellGrid, type Coords } from "./board";
import { NextBalls, type NextBallsTuple } from "./next-balls";
import { Score } from "./score";

type StorageData = {
  grid: CellGrid;
  activeCoords: ActiveCoords;
  nextBalls: NextBallsTuple | [];
};

const log = createLogger("👾 game");

@classLogger(log)
export class Game {
  isOver = false;
  isShaking = false;
  isAnimating = false;

  board;
  nextBalls;
  score;
  storage = createStorage<StorageData>("state");

  constructor(board: Board, nextBalls: NextBalls, score: Score) {
    this.board = board;
    this.nextBalls = nextBalls;
    this.score = score;
  }

  init() {
    if (this.storage.has()) this.restoreState();
    else this.start();
  }

  start() {
    this.isOver = false;
    this.board.reset();
    this.score.reset();
    this.nextBalls.update();
    this.board.addBalls(this.nextBalls.value);
    this.nextBalls.update();
    this.saveState();
  }

  nextTurn() {
    if (this.isOver) return;
    const result = this.board.addBalls(this.nextBalls.value);
    this.checkLines();
    if (!result) return this.gameOver();

    this.nextBalls.update();
    this.saveState();
  }

  gameOver() {
    this.isOver = true;
    this.storage.clear();
  }

  async cellClick(coords: Coords) {
    this.isShaking = false;

    const clickedCell = this.board.getCell(coords);
    if (clickedCell) {
      this.board.activeCoords = coords;
    } else if (this.board.hasActiveCoords) {
      const path = this.board.findPath(coords);
      if (!path) return (this.isShaking = true);
      await this.board.moveActiveBall(coords);
      const hadLines = this.checkLines();
      if (!hadLines) this.nextTurn();
      else this.saveState();
    }
  }

  checkLines() {
    const lines = this.board.findLines();

    if (lines.length) {
      this.board.clearCells(lines);
      this.score.add(lines.length * 2);
    }

    return Boolean(lines.length);
  }

  saveState() {
    const state: StorageData = {
      grid: this.board.grid,
      activeCoords: this.board.activeCoords,
      nextBalls: this.nextBalls.value,
    };
    this.storage.set(state);
  }

  restoreState() {
    const { grid, activeCoords, nextBalls } = this.storage.get();
    this.board.grid = grid;
    this.board.activeCoords = activeCoords;
    this.nextBalls.value = nextBalls;
  }
}

const nextBalls = new NextBalls(Ball.randomColor);
const board = new Board();
const score = new Score();

export default createStore(new Game(board, nextBalls, score));
