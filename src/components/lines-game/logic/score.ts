import { signal } from "@preact/signals";
import { classLogger, createLogger } from "shared/logger";

const log = createLogger("💯 score");

@classLogger(log)
export class Score {
  score = signal(0);

  reset() {
    this.score.value = 0;
  }

  add(lines: number) {
    this.score.value += (lines + (lines - 5)) * 2;
  }
}
