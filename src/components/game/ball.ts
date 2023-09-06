import sample from "lodash/sample";

export const BALLS: BallColor[] = [
  "aqua",
  "blue",
  "green",
  "pink",
  "red",
  "violet",
  "yellow",
];

export type BallColor =
  | "aqua"
  | "blue"
  | "green"
  | "pink"
  | "red"
  | "violet"
  | "yellow";

export type BallSize = "regular" | "small";

export class Ball {
  color: BallColor;
  isMoving = false;

  constructor(color: BallColor, isMoving = false) {
    this.color = color;
    this.isMoving = isMoving;
  }

  static randomColor() {
    return new Ball(sample(BALLS)!);
  }
}