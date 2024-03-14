import { updateCardData } from "../../../../api/apiFns";
import EffectClass from "../../../classes/effectClass";
import SPCard from "../../../classes/spClass_V2";

export const specialEffectInit = (spCards: SPCard[]) => {
  const activeSPCards = spCards.filter(
    (card) => card.state === true && !card.disabled
  );
  if (activeSPCards.length > 1)
    throw new Error("⛔ - Custom: More than 1 Active Effect Card Detected!");
  if (activeSPCards.length === 1) {
    const spCard = activeSPCards[0];

    if (spCard.expiresAtUnix === null)
      throw new Error(
        "⛔ - Custom: Active Effect Card has no expiration date!"
      );

    // 🔷 Check if Expired
    if (spCard.expiresAtUnix < Date.now() / 1000) {
      if (spCard.id === null)
        throw new Error("⛔ specialEffectInit.ts: SPCard's ID is null!");

      updateCardData({ id: spCard.id, state: 0, disabled: true });
      return false;
    }

    

    const activeEffect = new EffectClass(spCard, spCard.expiresAtUnix);
    console.log("🙌 4 - The Active Effect: ", activeEffect);
    return activeEffect;
  }
  return null;
};
