import { Workers } from "../../types/GameLoopTypes/GameLoopTypes";

export function compareWorkers(obj1: Workers, obj2: Workers): boolean {
  // List all keys of the Workers interface to iterate over them
  const keys: (keyof Workers)[] = [
    "privateSector",
    "concreteWorkers",
    "metalsWorkers",
    "crystalsWorkers",
    "dieselWorkers",
    "hospitalWorkers",
  ];

  // Iterate over each key to compare values in both objects
  for (const key of keys) {
    if (obj1[key] !== obj2[key]) {
      // If even one property value is different, return true
      return true;
    }
  }

  // If all property values are the same, return false
  return false;
}
