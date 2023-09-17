import sample from "lodash/sample";

export const BALLS: BallColor[] = [
  "aqua",
  "blue",
  "green",
  "pink",
  "orange",
  "violet",
  "yellow",
];

export type BallColor =
  | "aqua"
  | "blue"
  | "green"
  | "pink"
  | "orange"
  | "violet"
  | "yellow";

export class Ball {
  color: BallColor | "invisible";
  isMoving = false;

  constructor(color: BallColor | "invisible", isMoving = false) {
    this.color = color;
    this.isMoving = isMoving;
  }

  static randomColor() {
    return new Ball(sample(BALLS)!);
  }
}
