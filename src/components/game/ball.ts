import sample from "lodash/sample";

type Color = "aqua" | "blue" | "green" | "pink" | "red" | "violet" | "yellow";
const COLORS = ["aqua", "blue", "green", "pink", "red", "violet", "yellow"];

export class Ball {
  color: Color;
  visible: boolean = true;
  small: boolean = false;

  constructor(color: Color, small: boolean = true) {
    this.color = color;
    this.small = small;
  }

  static random() {
    return new Ball(sample(COLORS) as Color);
  }
}
