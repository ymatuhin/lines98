import sample from "lodash/sample";

type Color = "aqua" | "blue" | "green" | "pink" | "red" | "violet" | "yellow";
const COLORS = ["aqua", "blue", "green", "pink", "red", "violet", "yellow"];

export type Ball = {
  color: Color;
  visible: boolean;
  small: boolean;
};

export function createBall(color: Color, small: boolean = false) {
  return {
    color,
    small,
    visible: true,
  } as Ball;
}

export function createRandomBall() {
  return createBall(sample(COLORS) as Color);
}
