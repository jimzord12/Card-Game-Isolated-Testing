// Output
interface coefficient {
  [key: number]: number;
}

const levelMultiplier: coefficient = {
  1: 0,
  2: 0.2,
  3: 0.5,
  4: 1,
  5: 2,
};
const rarityMultiplier: coefficient = {
  1: 0,
  2: 0.1,
  3: 0.25,
  4: 0.75,
  5: 1.5,
};

// Requirements
const levelReqMulti: coefficient = {
  1: 0.2,
  2: 0.75,
  3: 1.25,
  4: 2.25,
  5: 5,
};
const upgradeCoef: coefficient = {
  1: 0,
  2: 0.1,
  3: 0.25,
  4: 0.5,
  5: 0.75,
};

export { levelMultiplier, levelReqMulti, rarityMultiplier, upgradeCoef };
