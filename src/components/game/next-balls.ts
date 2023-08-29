import { writable } from "svelte/store";
import { type Ball, createRandomBall } from "./ball";

export const $nextBalls = writable<Ball[]>(getRandomBalls());

export function updateNextBalls() {
  $nextBalls.set(getRandomBalls());
}

function getRandomBalls() {
  return [createRandomBall(), createRandomBall(), createRandomBall()];
}
