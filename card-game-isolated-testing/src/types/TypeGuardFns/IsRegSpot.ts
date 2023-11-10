import { RegSpot } from "..";

export function isRegSpot(value: number): value is RegSpot {
  return [0, 1, 3, 8, 10, 11, 13].includes(value);
}
