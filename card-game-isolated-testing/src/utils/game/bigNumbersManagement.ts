export const justTheBs = (num: number) => {
  return Math.trunc(num / 1000000000).toString() + "b";
};

export const justTheMills = (num: number) => {
  return Math.trunc(num / 1000000).toString() + "m";
};

export const justTheKs = (num: number) => {
  return Math.trunc(num / 1000).toString() + "k";
};

export function countDigits(num: number) {
  const numStr = num.toString().replace(/[^0-9]/g, "");
  return numStr.length;
}
