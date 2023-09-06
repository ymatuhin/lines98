import { classLogger, createLogger } from "shared/logger";

const log = createLogger("💯 score");

@classLogger(log)
export class Score {
  value = 0;

  reset() {
    this.value = 0;
  }

  add(term: number) {
    this.value += term;
  }
}
