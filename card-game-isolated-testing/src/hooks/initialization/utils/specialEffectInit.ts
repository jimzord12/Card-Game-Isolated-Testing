import EffectClass from "../../../classes/effectClass";
import SPCard from "../../../classes/spClass_V2";

export const specialEffectInit = (spCards: SPCard[]) => {
  const activeSPCards = spCards.filter((card) => card.state === true);
  if (activeSPCards.length > 1)
    throw new Error("⛔ - Custom: More than 1 Active Effect Card Detected!");
  if (activeSPCards.length === 1) {
    const spCard = activeSPCards[0];

    if (spCard.expiresAtUnix === null)
      throw new Error(
        "⛔ - Custom: Active Effect Card has no expiration date!"
      );

    const activeEffect = new EffectClass(spCard, spCard.expiresAtUnix);
    console.log("🙌 4 - The Active Effect: ", activeEffect);
    return activeEffect;
  }
  return null;
};
