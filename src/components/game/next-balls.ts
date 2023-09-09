import { classLogger, createLogger } from "shared/logger";
import { Ball } from "./ball";
import { signal } from "@preact/signals";

const log = createLogger("🟡 next-balls");

export type NextBallsTuple = [Ball, Ball, Ball];

@classLogger(log)
export class NextBalls {
  balls = signal<NextBallsTuple>([
    new Ball("invisible"),
    new Ball("invisible"),
    new Ball("invisible"),
  ]);

  randomBallFactory;
  constructor(randomBallFactory: typeof Ball.randomColor) {
    this.randomBallFactory = randomBallFactory;
  }

  update() {
    const newBalls: NextBallsTuple = [
      this.randomBallFactory(),
      this.randomBallFactory(),
      this.randomBallFactory(),
    ];

    this.balls.value = newBalls;
  }
}
