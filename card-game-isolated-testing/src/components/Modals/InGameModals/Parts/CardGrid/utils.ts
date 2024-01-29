export function removeObjectWithId<T extends { id: number }>(
  arr: T[],
  id: number
): T[] {
  if (arr.length > 0 && id) {
    return arr.filter((obj: T) => {
      if (id in obj) {
        return obj.id !== id;
      } else {
        return null;
      }
    });
  }
  return arr;
}

export function isFloat(x: number) {
  // check if the passed value is a number
  if (typeof x == "number" && !isNaN(x)) {
    // check if it is integer
    if (Number.isInteger(x)) {
      console.log(`${x} is integer.`);
      return false;
    } else {
      console.log(`${x} is a float value.`);
      return true;
    }
  } else {
    console.log(`${x} is not a number`);
    return false;
  }
}

export const rarityCoverter = (rarityNumber: number) => {
  if (rarityNumber === undefined) return "Unknown";
  if (rarityNumber === 0) return "default";
  if (rarityNumber === 1) return "Common";
  if (rarityNumber === 2) return "Special";
  if (rarityNumber === 3) return "Rare";
  if (rarityNumber === 4) return "Mythic";
  if (rarityNumber === 5) return "Legendary";
  console.error("😱 Something Wrong at: Card.jsx, in: rarityCoverter()");
};

export function convertToMySQLDateTime(timestamp: Date | number) {
  const date = new Date(timestamp);

  const pad = (num: number) => (num < 10 ? "0" + num : num);

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1); // Months are zero-based
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export function convertToMySQLDate(timestamp: number | Date) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 10);
}
