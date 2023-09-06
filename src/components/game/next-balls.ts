import { classLogger, createLogger } from "shared/logger";
import type { Ball } from "./ball";

const log = createLogger("🟡 next-balls");

export type NextBallsTuple = [Ball, Ball, Ball];

@classLogger(log)
export class NextBalls {
  value = [] as NextBallsTuple | [];

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

    this.value = newBalls;
  }
}
