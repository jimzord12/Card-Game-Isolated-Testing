export function roundToDecimal(value: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}
