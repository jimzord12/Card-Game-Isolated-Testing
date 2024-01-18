
export function getRandomNumberInRange(min: number, max: number): number {
    if (min > max) {
      throw new Error("Minimum value must be less than maximum value.");
    }
    return Math.random() * (max - min) + min;
  }