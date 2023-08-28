import { writable, get } from "svelte/store";
import { Ball } from "./ball";

export const nextBalls = writable<Ball[]>(getRandomBalls());

export const update = () => {
  nextBalls.set(getRandomBalls());
};

export const reset = () => {
  nextBalls.set([]);
};

function getRandomBalls() {
  return [Ball.random(), Ball.random(), Ball.random()];
}
