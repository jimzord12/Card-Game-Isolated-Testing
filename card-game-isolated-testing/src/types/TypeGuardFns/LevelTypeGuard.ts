import { Level } from "..";

export function isLevel(value: number): value is Level {
  if ([1, 2, 3, 4, 5].includes(value)) {
    return true;
  } else {
    throw new Error("Invalid level");
  }
}
