import { writable } from "svelte/store";

export const score = writable(0);

export const add = (scored: number) => {
  score.update((prev) => prev + scored);
};
export const reset = () => score.set(0);
