export function roundToDecimal(value: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export const round2Decimal = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const round4Decimal = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
};
