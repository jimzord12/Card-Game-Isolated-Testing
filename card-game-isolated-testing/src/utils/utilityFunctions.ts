export const roundToDecimal = (number: number, decimalPlaces: number) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};

export function formatDate(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getRandomNumberInRange(min: number, max: number): number {
  if (min > max) {
    throw new Error("Minimum value must be less than maximum value.");
  }
  return Math.random() * (max - min) + min;
}
